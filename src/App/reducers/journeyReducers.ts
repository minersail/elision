import { State, JourneyAction, JourneyActionType, JourneyEvent, EventPoolManager, MigrantState, Resource, GameScreen, JourneySpeed, Migrant } from '../utils/types';
import { AssertionError } from 'assert';
import { FOOT_SPEED, STOPPED_SPEED, CAR_SPEED, WATER_LITER_PER_DAYTIME, GAS_LITER_PER_DAYTIME } from '../utils/constants';

export function processDialogue(state: State, actions: JourneyAction[]): State {
    const currentEvent = state.journeyData.dayEvents[0];
    let negateTravel = false;

    for (const action of actions) {
        switch (action.actionType) {
            case JourneyActionType.GoToDialogue:
                state = {
                    ...state,
                    journeyData: {
                        ...state.journeyData,
                        dayEvents: [
                            {
                                ...currentEvent,
                                currentDialogueID: action.dialogueId,
                            },
                            ...state.journeyData.dayEvents.slice(1)
                        ],
                    }
                };
                break;
            case JourneyActionType.ModifyCash:
                state = {
                    ...state,
                    cash: state.cash + action.cash,
                };
                break;
            case JourneyActionType.ModifyGas:
                state = {
                    ...state,
                    resources: state.resources.map(r => r.type === Resource.Gas ? {...r, count: r.count + action.gas} : r),
                };
                break;      
            case JourneyActionType.ModifyDistance:
                state = {
                    ...state,
                    journeyData: {
                        ...state.journeyData,
                        distanceTravelled: state.journeyData.distanceTravelled + action.distance,
                    }
                };
                break;
            case JourneyActionType.NegateTravel:
                negateTravel = true;
                break;
            case JourneyActionType.MoveToCity:
                state = {
                    ...state,
                    journeyData: {
                        ...state.journeyData,
                        dayEvents: [],
                        distanceTravelled: state.journeyData.currentRoute.distance,
                    }
                }
                break;
            case JourneyActionType.ModifyWater:
                state = {
                    ...state,
                    resources: state.resources.map(r => r.type === Resource.Water ? {...r, count: r.count + action.water} : r),
                };
                break;                            
            case JourneyActionType.SwitchSpeed:
                state = {
                    ...state,
                    journeyData: {
                        ...state.journeyData,
                        speed: action.speed,
                    }
                };
                break;                                      
            case JourneyActionType.ResetResourceEvent:
                state = {
                    ...state,
                    pools: {
                        ...state.pools,
                        resourceEventPool: state.pools.resourceEventPool.map(ev => ev.resourceType === action.resource ? 
                            {...ev, initialEventCompleted: false} : ev),
                    }
                };
                break;                                          
            case JourneyActionType.LoseMigrant:
                state = {
                    ...state,
                    migrants: state.migrants.map(m => m.id === action.migrantId ? {...m, state: MigrantState.Failed } : m),
                };
                break;                                
            case JourneyActionType.LoseAllMigrants:
                state = {
                    ...state,
                    migrants: state.migrants.map(m => m.state === MigrantState.Journeying ? {...m, state: MigrantState.Failed } : m),
                };
                break;                                            
            case JourneyActionType.LoseGame:
                return {
                    ...state,
                    gameScreen: GameScreen.End,
                };
            case JourneyActionType.EndDialogue:
                state = {
                    ...state,
                    journeyData: {
                        ...state.journeyData,
                        dayEvents: state.journeyData.dayEvents.slice(1),
                    }
                };
                break;
        }
    }

    // This was the last event for the day
    if (state.journeyData.dayEvents.length === 0) {
        const speed = negateTravel ? 0 :
            (state.journeyData.speed === JourneySpeed.Driving ? CAR_SPEED :
            (state.journeyData.speed === JourneySpeed.Walking ? FOOT_SPEED : STOPPED_SPEED));
        const waterConsumed = (state.migrants.reduce((acc, m) => m.state === MigrantState.Journeying ? acc + 1 : acc, 0) + 1) * WATER_LITER_PER_DAYTIME;

        state = {
            ...state,
            resources: state.resources.map(res => res.type === Resource.Water ? { ...res, count: Math.max(0, res.count - waterConsumed) } : 
                (res.type === Resource.Gas ? {...res, count: Math.max(0, res.count - GAS_LITER_PER_DAYTIME) } : res)),
            journeyData: {
                ...state.journeyData,
                distanceTravelled: state.journeyData.distanceTravelled + speed,
                dayTime: state.journeyData.dayTime === "morning" ? "afternoon" : 
                    (state.journeyData.dayTime === "afternoon" ? "night" : "morning"),
                day: state.journeyData.dayTime === "night" ? state.journeyData.day + 1 : state.journeyData.day,
            }
        }

        const journeyEnded = (state.journeyData.currentRoute.distance - state.journeyData.distanceTravelled <= 0);

        state = journeyEnded ? endJourney(state) : generateEvents(state);
    }

    return state;
}

export function startJourney(state: State, destination: string): State {
    const route = state.routes.find(r => r.fromCity === state.currentCity.name && r.toCity === destination);

    // Route does not exist
    if (!route) { throw new AssertionError({ message: "Cities set up incorrectly" }); }

    state = {
        ...state,
        gameScreen: GameScreen.Journey,
        journeyData: {
            ...state.journeyData,
            currentRoute: route,
            distanceTravelled: 0,
            dayTime: "morning",
            speed: JourneySpeed.Driving,
        },
        pools: {
            ...state.pools,
            resourceEventPool: state.pools.resourceEventPool.map(ev => ({...ev, initialEventCompleted: false})),
        }
    }
    
    state = generateEvents(state);

    return state;
}

function endJourney(state: State): State {
    const currCity = state.cities.find(x => x.name === state.journeyData.currentRoute.toCity);

    if (!currCity) { throw new AssertionError({ message: "Cities set up incorrectly" }); }

    return {
        ...state,
        gameScreen: GameScreen.City,
        currentCity: currCity,
        currentCityHub: null,
    };
}

// Generate a list of events for a single day
function generateEvents(state: State): State {
    // Only get a list of the migrants that are currently on the journey
    const journeyMigrants = state.migrants.filter((migrant) => migrant.state === MigrantState.Journeying);

    const dayEvents: JourneyEvent[] = [];
    const pools: EventPoolManager = {...state.pools};

    // Generate migrant events
    for (const migrant of journeyMigrants) {
        // 20% chance per dayTime per migrant of one of their events spawning
        const spawn = Math.random() <= 0.2;
        if (!spawn) { continue; }

        // Get pool of events pertaining to this specific migrant
        const migrantPool = pools.migrantPools.find((event) => event.migrantID === migrant.id);
        const migrantPoolIndex = pools.migrantPools.findIndex((event) => event.migrantID === migrant.id);

        if (migrantPool !== undefined && migrantPool.poolIndex < migrantPool.events.length) {
            dayEvents.push(migrantPool.events[migrantPool.poolIndex]);

            // Retain immutability by generating new array by replacing the pool at the migrantPoolIndex
            pools.migrantPools = Object.assign([], pools.migrantPools, {[migrantPoolIndex]: {
                ...migrantPool,
                poolIndex: migrantPool.poolIndex + 1,
            }});
        }
    }

    // Generate zone events
    for (const zone of state.journeyData.currentRoute.zones) {
        // Account for going backwards along route
        const distAlongRoute = state.journeyData.distanceTravelled;
        const spawn = Math.random() <= zone.chance;

        if (spawn && distAlongRoute > zone.zoneStart && distAlongRoute < zone.zoneEnd) {
            const zonePool = pools.zonePools.find((pool) => pool.zoneType === zone.type);
            
            if (zonePool !== undefined) {
                const randomEvent = zonePool.events[Math.floor(Math.random() * zonePool.events.length)];

                dayEvents.push(randomEvent);
            }
        }
    }

    // Generate events for lack of water/gas
    for (const resource of state.resources) {
        if (resource.count > 0) { continue; }

        pools.resourceEventPool = pools.resourceEventPool.map(resourcePool => {
            if (resourcePool.resourceType !== resource.type) {
                return resourcePool;
            }

            if (!resourcePool.initialEventCompleted) {
                dayEvents.push(resourcePool.initialEvent);

                return {
                    ...resourcePool,
                    initialEventCompleted: true,
                }
            }
            else {                
                const spawn = Math.random() <= 0.3; // 30% chance of non-initial event spawning
                if (spawn) {
                    const randIndex = Math.floor(Math.random() * resourcePool.events.length);
                    const replacedEvent = replaceRandomMigrant(resourcePool.events[randIndex], journeyMigrants);

                    if (replacedEvent !== null) {
                        dayEvents.push(replacedEvent);
                    }
                }
                return resourcePool;
            }
        });
    }

    // Generate idle event (only if no other events)
    if (dayEvents.length === 0) {
        const randIndex = Math.floor(Math.random() * pools.idlePool.events.length);
        
        dayEvents.push(pools.idlePool.events[randIndex]);
    }

    return {
        ...state,
        journeyData: {
            ...state.journeyData,
            dayEvents,
        },
        pools
    };
}

// Replaces any placeholder migrant name and ids with a random migrant
// Returns null if there is a placeholder but no active migrants
function replaceRandomMigrant(event: JourneyEvent, activeMigrants: Migrant[]): JourneyEvent | null {
    if (activeMigrants.length === 0) {
        const includesPlaceholder = event.dialogues.reduce((acc, x) => acc || x.text.includes("MIGRANT") || 
        x.options.reduce((acc2, x2) => acc2 || x2.choiceText.includes("MIGRANT"), false), false);

        return includesPlaceholder ? null : event;
    }


    const randMigrant = activeMigrants[Math.floor(Math.random() * activeMigrants.length)];

    return {
        ...event,
        dialogues: event.dialogues.map(dialogue => ({
            ...dialogue,
            text: dialogue.text.replace("MIGRANT", randMigrant.name),
            options: dialogue.options.map(option => ({
                ...option,
                choiceText: option.choiceText.replace("MIGRANT", randMigrant.name),
                actions: option.actions.map(action => action.actionType === JourneyActionType.LoseMigrant ? 
                    { ...action, migrantId: randMigrant.id} : action),
            })),
        })),
    }
}