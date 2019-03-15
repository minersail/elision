import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { JourneyAction, Migrant, MigrantState, JourneyEvent } from './utils/types';
import DialogueBox from './components/DialogueBox';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import City from './components/City';
import Journey from './components/Journey';
import MainStreet from './components/MainStreet';

// TODO: Make Journey its own container component
interface AppProps {
    dialogue: string;
    demoType: number;
    gameScreen: number;

    cash: number;
    migrants: Migrant[];
    dayEvents: JourneyEvent[];
    day: number;

    nextDialogue: () => void;
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
                    this.props.demoType === 0 &&
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <DialogueBox dialogue={this.props.dialogue} next={this.props.nextDialogue} />
                    </header>
                }
                { 
                    this.props.demoType === 1 &&
                    
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
                            <Journey destination="Athens" day={ this.props.day } processDialogue={ this.props.processDialogue } 
                            dialogue={ this.props.dayEvents[0].dialogues[this.props.dayEvents[0].currentDialogueID] } />
                        }
                    </div>
                    }
            </div>
        );
    }
}

export default App;
