import { State, JourneyAction, JourneyActionType, JourneyEvent, EventPoolManager, MigrantState, ZoneEventPool } from '../utils/types';
import { AssertionError } from 'assert';

export function processDialogue(state: State, actions: JourneyAction[]): State {
    const currentEvent = state.journeyData.dayEvents[0];

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
        state = {
            ...state,
            journeyData: {
                ...state.journeyData,
                distanceTravelled: state.journeyData.distanceTravelled + 100,
                day: state.journeyData.day + 1,
            }
        }

        const journeyEnded = (state.journeyData.currentRoute.distance - state.journeyData.distanceTravelled <= 0);

        state = journeyEnded ? endJourney(state) : generateEvents(state);
    }

    return state;
}

export function startJourney(state: State, destination: string): State {
    let route = state.routes.find(r => r.fromCity === state.currentCity.name && r.toCity === destination);
    let forwards = true;

    if (!route) {
        route = state.routes.find(r => r.fromCity === destination && r.toCity === state.currentCity.name);
        forwards = false;
    }

    // Route does not exist backwards or forwards
    if (!route) { throw new AssertionError({ message: "Cities set up incorrectly" }); }

    state = {
        ...state,
        gameScreen: 1,
        journeyData: {
            ...state.journeyData,
            currentRoute: route,
            distanceTravelled: 0,
            forward: forwards,
        }
    }
    
    state = generateEvents(state);

    return state;
}

function endJourney(state: State): State {
    const currCity = state.cities.find(x => state.journeyData.forward ? 
        x.name === state.journeyData.currentRoute.toCity : 
        x.name === state.journeyData.currentRoute.fromCity); 

    if (!currCity) { throw new AssertionError({ message: "Cities set up incorrectly" }); }

    return {
        ...state,
        gameScreen: 0,
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
        // 30% chance per day per migrant of one of their events spawning
        const spawn = Math.random() <= 0.3;
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
        const distAlongRoute = state.journeyData.forward ? state.journeyData.distanceTravelled :
            state.journeyData.currentRoute.distance - state.journeyData.distanceTravelled;
        const spawn = Math.random() <= zone.chance;

        if (spawn && distAlongRoute > zone.zoneStart && distAlongRoute < zone.zoneEnd) {
            const zonePool = pools.zonePools.find((pool) => pool.zoneType === zone.type);
            
            if (zonePool !== undefined) {
                const randomEvent = zonePool.events[Math.floor(Math.random() * zonePool.events.length)];

                dayEvents.push(randomEvent);
            }
        }
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