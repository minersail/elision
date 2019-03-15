import { State, JourneyAction, JourneyActionType, JourneyEvent, EventPoolManager, MigrantState } from '../utils/types';

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
        }

        state = generateEvents(state);
    }

    return state;
}

export function startJourney(state: State): State {
    return {
        ...generateEvents(state),
        gameScreen: 2,
    }
}

function generateEvents(state: State): State {
    // Only get a list of the migrants that are currently on the journey
    const journeyMigrants = state.migrants.filter((migrant) => migrant.state === MigrantState.Journeying);

    const dayEvents: JourneyEvent[] = [];
    const pools = {...state.pools};

    // Generate migrant events
    for (const migrant of journeyMigrants) {
        // 50% chance per day per migrant of one of their events spawning
        const spawn = Math.random() >= 0.5;
        if (!spawn) { continue; }

        // Get pool of events pertaining to this specific migrant
        const migrantPool = pools.migrantPools.find((event) => event.migrantID === migrant.id);
        const migrantPoolIndex = pools.migrantPools.findIndex((event) => event.migrantID === migrant.id);

        if (migrantPool !== undefined && migrantPool.poolIndex < migrantPool.events.length) {
            dayEvents.push(migrantPool.events[migrantPool.poolIndex]);

            pools.migrantPools = Object.assign([], pools.migrantPools, {[migrantPoolIndex]: {
                ...migrantPool,
                poolIndex: migrantPool.poolIndex + 1,
            }});
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