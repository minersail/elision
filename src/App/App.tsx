import React, { Component } from 'react';
import './App.css';
import { JourneyAction, Migrant, MigrantState, JourneyEvent, JourneyData } from './utils/types';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import City from './components/City';
import Journey from './components/Journey';
import MainStreet from './components/MainStreet';

// TODO: Make Journey its own container component
interface AppProps {
    gameScreen: number;

    cash: number;
    migrants: Migrant[];

    dayEvents: JourneyEvent[];
    day: number;
    journeyData: JourneyData;

    switchScreen: (screenId: number) => void;
    acceptRecruit: (migrantID: number) => void;   
	startJourney: () => void;
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
                        <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ this.props.gameScreen === 2 } />                  
                        {                         
                            this.props.gameScreen === 0 &&
                            <City name="Izmir" switchScreen={ this.props.switchScreen } startJourney={ this.props.startJourney }
                            hasSelectedMigrants={ this.props.migrants.filter((m) => m.state === MigrantState.Journeying).length > 0 } />

                            ||

                            this.props.gameScreen === 1 &&
                            <MainStreet info="Izmir's streets are lined with bistros, shops, and hotels. Around
                            a well-known cafe, you spot a few figures who act like they don't quite belong. Perhaps
                            they are just from out of town, but it wouldn't hurt to see if anyone's looking for a guide." 
                            migrants={ this.props.migrants }
                            switchScreen={ this.props.switchScreen } acceptRecruit={ this.props.acceptRecruit } />

                            ||

                            this.props.gameScreen === 2 &&
                            <Journey destination={ this.props.journeyData.forward ? 
                                this.props.journeyData.currentRoute.toCity : this.props.journeyData.currentRoute.fromCity } 
                            day={ this.props.day } distRemaining={ this.props.journeyData.currentRoute.distance - this.props.journeyData.distanceTravelled } 
                            processDialogue={ this.props.processDialogue } 
                            dialogue={ this.props.dayEvents[0].dialogues[this.props.dayEvents[0].currentDialogueID] } />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default App;
