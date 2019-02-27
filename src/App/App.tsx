import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { JourneyAction, JourneyData, Migrant, MigrantState } from './utils/types';
import DialogueBox from './components/DialogueBox';
import Sidebar from './components/Sidebar';
import City from './components/City';
import Journey from './components/Journey';
import MainStreet from './components/MainStreet';

interface AppProps {
    dialogue: string;
    demoType: number;
    gameScreen: number;

    cash: number;
    migrants: Migrant[];
    journeyData: JourneyData;

    nextDialogue: () => void;
    switchScreen: (screenId: number) => void;
    acceptRecruit: (migrantID: number) => void;
    chooseJourneyOption: (action: JourneyAction) => void;
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
                    
                        (this.props.gameScreen === 0 &&
                        <div className="game-container">
                            <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ false } />
                            <City name="Izmir" switchScreen={ this.props.switchScreen } 
                            hasSelectedMigrants={ this.props.migrants.filter((m) => m.state === MigrantState.Selected).length > 0 }/>
                        </div>)

                        ||

                        (this.props.gameScreen === 1 &&
                        <div className="game-container">
                            <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ false } />
                            <MainStreet info="Izmir's streets are lined with bistros, shops, and hotels. Around
                            a well-known cafe, you spot a few figures who act like they don't quite belong. Perhaps
                            they are just from out of town, but it wouldn't hurt to see if anyone's looking for a guide." 
                            migrants={ this.props.migrants }
                            switchScreen={ this.props.switchScreen } acceptRecruit={ this.props.acceptRecruit } />
                        </div>)

                        ||

                        (this.props.gameScreen === 2 &&
                        <div className="game-container">
                            <Sidebar name="Ibrahim" reputation="anonymous, unvetted" cash={ this.props.cash } inverted={ true } />
                            <Journey destination="Bab-el-Hawa" day={ 0 } chooseOption={ this.props.chooseJourneyOption } data={ this.props.journeyData } />
                        </div>)
                    }
            </div>
        );
    }
}

export default App;
