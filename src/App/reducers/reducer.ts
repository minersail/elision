import { ActionType, getType } from 'typesafe-actions';
import { ContinueOption, JourneyAction, JourneyActionType, MigrantState, State } from '../utils/types';
import * as actions from '../actions/actions';
import { advanceDialogue } from './dialogue';

const initialState = {
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
                        choiceText: "Give him ₺200 to look the other way.",
                        action: {
                            actionType: JourneyActionType.ModifyCash as JourneyActionType.ModifyCash, // https://github.com/Microsoft/TypeScript/issues/28102
                            cash: -200,
                        }
                    },
                ]
            },
            {
                text: "A day passes at sea without much excitement. Waseem breaks the silence by \
                    telling you about how his two-year military service was extended indefinitely, \
                    due to the onset of the Syrian civil war. He defected overnight, leaving with \
                    only enough cash to pay you.",
                options: [
                    {
                        choiceText: "Spare him ₺200 for his future endeavours.",
                        action: {
                            actionType: JourneyActionType.ModifyCash as JourneyActionType.ModifyCash,
                            cash: -200,
                        }
                    },
                    {
                        choiceText: "Continue in silence.",
                        action: {
                            actionType: JourneyActionType.Continue as JourneyActionType.Continue,
                        }
                    }
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