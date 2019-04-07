import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import './App.css';
import { JourneyAction, Migrant, MigrantState, State, JourneyData, CityData, CityHubType, CityHub } from './utils/types';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import City from './components/City';
import Journey from './components/Journey';

const mapStateToProps = (state: State) => ({
    gameScreen: state.gameScreen,
    
	cash: state.cash,
    migrants: state.migrants,
    cities: state.cities,

    journeyData: state.journeyData,
    currentCity: state.currentCity,
    currentCityHub: state.currentCityHub,
});

const mapDispatchToProps = (dispatch: any) => ({
	switchScreen: (screenId: number) => {
		dispatch(actions.switchScreen(screenId));
    },
    switchHub: (hubType: CityHubType) => {
        dispatch(actions.switchHub(hubType));
    },
	acceptRecruit: (migrantID: number) => {
		dispatch(actions.acceptRecruit(migrantID));
	},
	startJourney: (destination: string) => {
		dispatch(actions.startJourney(destination));
	},
	processDialogue: (journeyActions: JourneyAction[]) => {
		dispatch(actions.processDialogue(journeyActions));
	},
});

interface AppProps {
    gameScreen: number;

    cash: number;
    migrants: Migrant[];
    cities: CityData[];

    journeyData: JourneyData;
    currentCity: CityData;
    currentCityHub: CityHub;

    switchScreen: (screenId: number) => void;
    switchHub: (hubType: CityHubType) => void;
    acceptRecruit: (migrantID: number) => void;   
	startJourney: (destination: string) => void;
	processDialogue: (journeyActions: JourneyAction[]) => void;
}

class App extends Component<AppProps> {
    public render() {
        return (
            <div className="App">
                {                    
                    this.props.gameScreen === -1 &&
                    <Intro switchScreen={ this.props.switchScreen } />

                    ||
                    
                    <div className="game-container">
                        <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ this.props.gameScreen === 1 } 
                        activeMigrants={ this.props.migrants.filter((migrant) => migrant.state === MigrantState.Journeying) } />                  
                        {                         
                            this.props.gameScreen === 0 &&
                            <City city={ this.props.currentCity } currentHub={ this.props.currentCityHub } startJourney={ this.props.startJourney }
                            hasSelectedMigrants={ this.props.migrants.filter((m) => m.state === MigrantState.Journeying).length > 0 }
                            migrants={ this.props.migrants } acceptRecruit={ this.props.acceptRecruit } switchHub={ this.props.switchHub } />

                            ||

                            this.props.gameScreen === 1 &&
                            <Journey destination={ this.props.journeyData.forward ? 
                                this.props.journeyData.currentRoute.toCity : this.props.journeyData.currentRoute.fromCity } 
                            day={ this.props.journeyData.day } distRemaining={ this.props.journeyData.currentRoute.distance - this.props.journeyData.distanceTravelled } 
                            processDialogue={ this.props.processDialogue } 
                            dialogue={ this.props.journeyData.dayEvents[0].dialogues[this.props.journeyData.dayEvents[0].currentDialogueID] } />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
