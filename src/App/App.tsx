import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import './App.css';
import { JourneyAction, Migrant, MigrantState, State, JourneyData, CityData, CityHubType, CityHub, ResourceUnit, Resource } from './utils/types';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import City from './components/City';
import Journey from './components/Journey';

const mapStateToProps = (state: State) => ({
    gameScreen: state.gameScreen,
    notebookActive: state.notebookActive,
    
    cash: state.cash,
    resources: state.resources,
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
	toggleNotebook: (enable: boolean) => {
		dispatch(actions.toggleNotebook(enable));
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
	purchaseItem: (resource: Resource, amount: number, price: number) => {
		dispatch(actions.purchaseItem(resource, amount, price));
	},
});

interface AppProps {
    gameScreen: number;
    notebookActive: boolean;

    cash: number;
    resources: ResourceUnit[];
    migrants: Migrant[];
    cities: CityData[];

    journeyData: JourneyData;
    currentCity: CityData;
    currentCityHub: CityHub;

    switchScreen: (screenId: number) => void;
    switchHub: (hubType: CityHubType) => void;
    toggleNotebook: (enable: boolean) => void;
    acceptRecruit: (migrantID: number) => void;
	startJourney: (destination: string) => void;
	processDialogue: (journeyActions: JourneyAction[]) => void;
    purchaseItem: (resource: Resource, amount: number, price: number) => void;
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
                        activeMigrants={ this.props.migrants.filter((migrant) => migrant.state === MigrantState.Journeying) } resources={ this.props.resources } 
                        notebookActive={ this.props.notebookActive } toggleNotebook={ this.props.toggleNotebook } />                  
                        {                         
                            this.props.gameScreen === 0 &&
                            <City city={ this.props.currentCity } currentHub={ this.props.currentCityHub } startJourney={ this.props.startJourney }
                            hasSelectedMigrants={ this.props.migrants.filter((m) => m.state === MigrantState.Journeying).length > 0 }
                            migrants={ this.props.migrants } acceptRecruit={ this.props.acceptRecruit } switchHub={ this.props.switchHub }
                            purchaseItem={ this.props.purchaseItem } resources={ this.props.resources } />

                            ||

                            this.props.gameScreen === 1 &&
                            <Journey dayTime = { this.props.journeyData.dayTime } processDialogue={ this.props.processDialogue } 
                            destination={ this.props.journeyData.forward ? this.props.journeyData.currentRoute.toCity : this.props.journeyData.currentRoute.fromCity } 
                            day={ this.props.journeyData.day } distRemaining={ this.props.journeyData.currentRoute.distance - this.props.journeyData.distanceTravelled } 
                            dialogue={ this.props.journeyData.dayEvents[0].dialogues[this.props.journeyData.dayEvents[0].currentDialogueID] } />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
