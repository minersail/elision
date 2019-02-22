import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import DialogueBox from './components/DialogueBox';
import Sidebar from './components/Sidebar';
import City from './components/City';

interface AppProps {
    dialogue: string;
    demoType: number;

    nextDialogue: () => void;
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
                    <div className="game-container">
                        <Sidebar name="Ibrahim" reputation="anonymous, unvetted" money="500" />
                        <City name="Izmir" />
                    </div>
                }
            </div>
        );
    }
}

export default App;
