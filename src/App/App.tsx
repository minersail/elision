import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import DialogueBox from './components/DialogueBox';

interface AppProps {
    dialogue: string,
    nextDialogue: () => void;
}

class App extends Component<AppProps> {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <DialogueBox dialogue={this.props.dialogue} next={this.props.nextDialogue} />
                </header>
            </div>
        );
    }
}

export default App;
