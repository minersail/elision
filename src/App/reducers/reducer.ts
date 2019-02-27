import { ActionType, getType } from 'typesafe-actions';
import { ContinueOption, JourneyAction, JourneyActionType, MigrantState, State } from '../utils/types';
import * as actions from '../actions/actions';
import { advanceDialogue } from './dialogue';

const initialState = {
    dialogue: ["Click", "The", "Arrows", "To", "Progress", "Through", "This", "Linear", "Dialogue", "That", "Resets"],
    index: 0,
    demoType: 1,
    gameScreen: 0,
    cash: 500,
    migrants: [
        {
            id: 0,
            name: "Bob",
            nationality: "Bobese",
            languages: ["Bobese"],
            shortBio: "Bob is nice",
            bio: "Bob is very nice",
            state: MigrantState.Open,
        }
    ],
    journeyData: {
        days: [
            {
                text: "You start on your Journey.",
                options: [
                    ContinueOption,
                ]
            },
            {
                text: "You meet an acquaintance at the docks, a member of the Coast Guard Command. \
                    He recognizes you with your passenger, then stops as if to say the next move is on you.",
                options: [
                    {
                        choiceText: "Give him $100 to look the other way.",
                        action: {
                            actionType: JourneyActionType.ModifyCash as JourneyActionType.ModifyCash, // https://github.com/Microsoft/TypeScript/issues/28102
                            cash: -100,
                        }
                    },
                ]
            },
            {
                text: "Bob tells you about his dark, secret past.",
                options: [
                    ContinueOption,
                ]
            }
        ],
        index: 0,
    },
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
                    state: MigrantState.Selected,
                })
            };
        case getType(actions.chooseJourneyOption):
            return journeyReducer(state, action.payload);
        default:
            return state;
    }
}

function journeyReducer(state: State, jaction: JourneyAction): State {
    switch (jaction.actionType) {
        case JourneyActionType.Continue:
            return {
                ...state,
                journeyData: {
                    ...state.journeyData,
                    index: (state.journeyData.index + 1) % state.journeyData.days.length
                }
            };
        case JourneyActionType.ModifyCash:
            return {
                ...state,
                cash: state.cash + jaction.cash,                
                journeyData: {
                    ...state.journeyData,
                    index: (state.journeyData.index + 1) % state.journeyData.days.length
                }
            };
    }
}

export type Action = ActionType<typeof actions>;

export default reducer;