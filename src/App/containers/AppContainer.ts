import { connect } from 'react-redux';
import { State } from '../utils/types';
import App from '../App';

const mapStateToProps = (state: State) => ({
	stuff: state.stuff,
});

const mapDispatchToProps = (dispatch: any) => ({});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;