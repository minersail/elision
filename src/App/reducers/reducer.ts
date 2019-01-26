import { ActionType, getType } from 'typesafe-actions';
import { State } from '../utils/types';
import * as actions from '../actions/actions';
import { advanceDialogue } from './dialogue';

const initialState = {
    dialogue: ["Click", "The", "Arrows", "To", "Progress", "Through", "This", "Linear", "Dialogue", "That", "Resets"],
    index: 0,
};

function reducer(state: State = initialState, action: Action): State {
    switch(action.type)
    {
        case getType(actions.nextDialogue):
            return {
                ...state,
                index: advanceDialogue(state.index, state.dialogue.length),
            }
        default:
            return state;
    }
}

export type Action = ActionType<typeof actions>;

export default reducer;