import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Basic from './components/Basic';

interface AppProps {
    stuff: string[],
}

class App extends Component<AppProps> {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {
                        this.props.stuff.map((thing) => {
                            return <Basic info={thing} key={thing} />
                        })
                    }
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
