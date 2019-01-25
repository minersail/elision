import { State } from '../utils/types';

const initialState = {
    stuff: ["Hi", "Bye", "Junk"],
};

function reducer(state: State = initialState): State {
	return state;
}

export default reducer;