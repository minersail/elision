import { ActionType, getType } from 'typesafe-actions';
import { MigrantState, State } from '../utils/types';
import * as actions from '../actions/actions';
import { advanceDialogue } from './dialogue';
import { startJourney, processDialogue } from './journeyReducers';
import idleEvents from './state/idleEvents';
import migrantEvents from './state/migrantEvents';
import zoneEvents from './state/zoneEvents';

const initialState: State = {
    dialogue: ["Click", "The", "Arrows", "To", "Progress", "Through", "This", "Linear", "Dialogue", "That", "Resets"],
    index: 0,
    demoType: 1,
    gameScreen: -1,
    cash: 1000,
    migrants: [
        {
            id: 0,
            name: "Waseem",
            nationality: "Syrian",
            languages: ["Aramaic", "Arabic"],
            shortBio: "A Christian pacifist, Waseem is fleeing the Syrian civil war.",
            bio: "Waseem fled after military service...finish bio later",
            state: MigrantState.Open,
        }
    ],
    pools: {
        migrantPools: migrantEvents,
        zonePools: zoneEvents,
        idlePool: idleEvents,
    },
    dayEvents: [],
    day: 0,
};

function reducer(state: State = initialState, action: Action): State {
    switch(action.type)
    {
        case getType(actions.nextDialogue):
            return {
                ...state,
                index: advanceDialogue(state.index, state.dialogue.length),
            };
        case getType(actions.switchScreen):
            return {
                ...state,
                gameScreen: action.payload,
            };
        case getType(actions.acceptRecruit):
            return {
                ...state,
                migrants: state.migrants.map((m) => m.id !== action.payload ? m : {
                    ...m,
                    state: MigrantState.Journeying,
                })
            };
        case getType(actions.startJourney):
            return startJourney(state);
        case getType(actions.processDialogue):
            return processDialogue(state, action.payload);
        default:
            return state;
    }
}

export type Action = ActionType<typeof actions>;

export default reducer;