import { connect } from 'react-redux';
import { JourneyAction, State } from '../utils/types';
import App from '../App';
import * as actions from '../actions/actions';

const mapStateToProps = (state: State) => ({
	dialogue: state.dialogue[state.index],
	demoType: state.demoType,
	gameScreen: state.gameScreen,
	cash: state.cash,
	migrants: state.migrants,
	dayEvents: state.dayEvents,
	day: state.day,
});

const mapDispatchToProps = (dispatch: any) => ({
	nextDialogue: () => {
		dispatch(actions.nextDialogue());
	},
	switchScreen: (screenId: number) => {
		dispatch(actions.switchScreen(screenId));
	},
	acceptRecruit: (migrantID: number) => {
		dispatch(actions.acceptRecruit(migrantID));
	},
	startJourney: () => {
		dispatch(actions.startJourney());
	},
	processDialogue: (journeyActions: JourneyAction[]) => {
		dispatch(actions.processDialogue(journeyActions));
	},
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;