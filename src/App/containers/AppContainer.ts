import { connect } from 'react-redux';
import { State } from '../utils/types';
import App from '../App';
import * as actions from '../actions/actions';
import { number } from 'prop-types';

const mapStateToProps = (state: State) => ({
	dialogue: state.dialogue[state.index],
	demoType: state.demoType,
	gameScreen: state.gameScreen,
});

const mapDispatchToProps = (dispatch: any) => ({
	nextDialogue: () => {
		dispatch(actions.nextDialogue());
	},

	switchScreen: (screenId: number) => {
		dispatch(actions.switchScreen(screenId));
	},
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;