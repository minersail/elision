import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import './App.css';
import { JourneyAction, Migrant, MigrantState, State, JourneyData, CityData, CityHubType, CityHub, ResourceUnit, Resource, NotebookData, GameScreen } from './utils/types';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import City from './components/City';
import Journey from './components/Journey';

const mapStateToProps = (state: State) => ({
    gameScreen: state.gameScreen,
    
    cash: state.cash,
    resources: state.resources,
    notebook: state.notebook,
    migrants: state.migrants,
    cities: state.cities,

    journeyData: state.journeyData,
    currentCity: state.currentCity,
    currentCityHub: state.currentCityHub,
});

const mapDispatchToProps = (dispatch: any) => ({
	switchScreen: (gameScreen: GameScreen) => {
		dispatch(actions.switchScreen(gameScreen));
    },
    switchHub: (hubType: CityHubType) => {
        dispatch(actions.switchHub(hubType));
    },
	toggleNotebook: (enable: boolean) => {
		dispatch(actions.toggleNotebook(enable));
    },
    flipNotebook: (forwards: boolean) => {
        dispatch(actions.flipNotebook(forwards));
    },
	acceptRecruit: (migrantID: number, money: number) => {
		dispatch(actions.acceptRecruit(migrantID, money));
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

    cash: number;
    resources: ResourceUnit[];
    notebook: NotebookData,
    migrants: Migrant[];
    cities: CityData[];

    journeyData: JourneyData;
    currentCity: CityData;
    currentCityHub: CityHub;

    switchScreen: (gameScreen: number) => void;
    switchHub: (hubType: CityHubType) => void;
    toggleNotebook: (enable: boolean) => void;
    flipNotebook: (forwards: boolean) => void;
    acceptRecruit: (migrantID: number, money: number) => void;
	startJourney: (destination: string) => void;
	processDialogue: (journeyActions: JourneyAction[]) => void;
    purchaseItem: (resource: Resource, amount: number, price: number) => void;
}

class App extends Component<AppProps> {
    public render() {
        return (
            <div className="App">
                {                    
                    this.props.gameScreen === GameScreen.Start &&
                    <Intro switchScreen={ this.props.switchScreen } />

                    ||
                    
                    <div className="game-container">
                        <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ this.props.gameScreen === GameScreen.Journey } 
                        activeMigrants={ this.props.migrants.filter((migrant) => migrant.state === MigrantState.Journeying) } resources={ this.props.resources } 
                        notebook={ this.props.notebook } toggleNotebook={ this.props.toggleNotebook } flipNotebook={ this.props.flipNotebook } 
                        gameScreen={ this.props.gameScreen } currentCity={ this.props.currentCity } journeyData={ this.props.journeyData } />
                        {                         
                            this.props.gameScreen === GameScreen.City &&
                            <City city={ this.props.currentCity } currentHub={ this.props.currentCityHub } startJourney={ this.props.startJourney }
                            hasSelectedMigrants={ this.props.migrants.filter((m) => m.state === MigrantState.Journeying).length > 0 }
                            migrants={ this.props.migrants } acceptRecruit={ this.props.acceptRecruit } switchHub={ this.props.switchHub }
                            purchaseItem={ this.props.purchaseItem } resources={ this.props.resources } />

                            ||

                            this.props.gameScreen === GameScreen.Journey &&
                            <Journey dayTime = { this.props.journeyData.dayTime } processDialogue={ this.props.processDialogue } 
                            destination={ this.props.journeyData.currentRoute.toCity } 
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
