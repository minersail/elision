import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import DialogueBox from './components/DialogueBox';
import Sidebar from './components/Sidebar';
import City from './components/City';
import Journey from './components/City';
import MainStreet from './components/MainStreet';

interface AppProps {
    dialogue: string;
    demoType: number;
    gameScreen: number;

    nextDialogue: () => void;
    switchScreen: (screenId: number) => void;
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
                            <Sidebar name="Ibrahim" reputation="anonymous, unvetted" money="500" />
                            <City name="Izmir" switchScreen={ this.props.switchScreen } />
                        </div>)

                        ||

                        (this.props.gameScreen === 1 &&
                        <div className="game-container">
                            <Sidebar name="Ibrahim" reputation="anonymous, unvetted" money="500" />
                            <MainStreet info="Izmir's streets are lined with bistros, shops, and hotels. Around
                            a well-known cafe, you spot a few figures who act like they don't quite belong. Perhaps
                            they are just from out of town, but it wouldn't hurt to see if anyone's looking for a guide." 
                            switchScreen={ this.props.switchScreen } />
                        </div>)
                    }
            </div>
        );
    }
}

export default App;
