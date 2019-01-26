import { connect } from 'react-redux';
import { State } from '../utils/types';
import App from '../App';
import * as actions from '../actions/actions';

const mapStateToProps = (state: State) => ({
	dialogue: state.dialogue[state.index],
});

const mapDispatchToProps = (dispatch: any) => ({
	nextDialogue: () => {
		dispatch(actions.nextDialogue());
	}
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;