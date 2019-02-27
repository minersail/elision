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
                ],
            },
            {                
                text: "By night, you reach a privately owned shore and embark. Waseem pays you \
                    the money he owes you, and the owner of the private land takes his agreed cut.",
                options: [
                    {
                        choiceText: "Bid Waseem farewell.",
                        action: {
                            actionType: JourneyActionType.ModifyCash as JourneyActionType.ModifyCash,
                            cash: 1000,
                        }
                    },
                ]
            },            
            {                
                text: "Hello! Thank you for participating in this user feedback experience. This journey \
                    is not entirely accurate (for one, Izmir is a 90 minute ferry ride from Athens), and \
                    will be replaced by more accurate and dynamic journies later.",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "This project is currently in a state where I would like to recieve feedback for the \
                    overall idea and presentation. Following will be five questions - if you can email your \
                    answers to jkwoo1234@gmail.com, it would be greatly appreciated.",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "1. Does the intro screen give you enough of a background to start the game? What do \
                    you think was missing that could have contributed to your understanding of what the project \
                    was and how it worked? ",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "2. At what points was the game confusing or too complicated? Too simple? Keep in mind \
                    that in the future many more features will be added, such as factoring in real life events \
                    (Operation Mare Nostrum), more members and components of the smuggling industry, etc. to better \
                    investigate the geopolitical, social, economic, and historical factors behind mass migration.",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "3. Was the user interface easy to use? Was it obvious what had to be done next at every \
                    stage? Any complaints about the visuals?",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "4. The centerpiece of this project is a discussion about how media should represent complex \
                    topics. If it is too complicated, it is inaccessible to the average viewer, but if it is too \
                    simple, it risks trivializing important issues experienced by real people. Do you think games \
                    can do a complex topic justice? Do you think, given time to develop, this game can do the complex \
                    topic of immigration justice?",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "5. For you, do you think this game would be an engaging experience? Do you think this game would \
                    be an educational experience? If so, why? If not, what do you think could be done to make it a \
                    better experience?",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "6 (optional). If you have personal experience with what it is like to immigrate, what about \
                    your experiences do you wish was told more often? Is there any part of your experience that is \
                    often unrepresented or misrepresented in media?",
                options: [
                    ContinueOption,
                ]
            },        
            {                
                text: "Thank you for participating in my capstone user feedback survey! Friendly reminder that my \
                    email is jkwoo1234@gmail.com. If you accidentally skipped any questions, refreshing the page will \
                    reset the application.",
                options: [
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