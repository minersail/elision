import { State, JourneyAction, JourneyActionType, JourneyEvent, EventPoolManager, MigrantState, ZoneEventPool } from '../utils/types';

export function processDialogue(state: State, actions: JourneyAction[]): State {
    const currentEvent = state.dayEvents[0];

    for (const action of actions) {
        switch (action.actionType) {
            case JourneyActionType.GoToDialogue:
                state = {
                    ...state,
                    dayEvents: [
                        {
                            ...currentEvent,
                            currentDialogueID: action.dialogueId,
                        },
                        ...state.dayEvents.slice(1)
                    ]
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
                    dayEvents: state.dayEvents.slice(1),
                };
                break;
        }
    }

    if (state.dayEvents.length === 0) {
        state = {
            ...state,
            day: state.day + 1,
            journeyData: {
                ...state.journeyData,
                distanceTravelled: state.journeyData.distanceTravelled + 100
            }
        }

        state = generateEvents(state);
    }

    return state;
}

export function startJourney(state: State): State {
    return {
        ...generateEvents(state),
        gameScreen: 2,
        journeyData: {
            currentRoute: state.routes[0],
            forward: true,
            distanceTravelled: 0,
        }
    }
}

// Generate a list of events for a single day
function generateEvents(state: State): State {
    // Only get a list of the migrants that are currently on the journey
    const journeyMigrants = state.migrants.filter((migrant) => migrant.state === MigrantState.Journeying);

    const dayEvents: JourneyEvent[] = [];
    const pools: EventPoolManager = {...state.pools};

    // Generate migrant events
    for (const migrant of journeyMigrants) {
        // 50% chance per day per migrant of one of their events spawning
        const spawn = Math.random() <= 0.5;
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
        // TODO: Account for the forwards parameter
        const distance = state.journeyData.distanceTravelled;
        const spawn = Math.random() <= zone.chance;

        if (distance > zone.zoneStart && distance < zone.zoneEnd && spawn) {
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
        dayEvents,
        pools
    };
}