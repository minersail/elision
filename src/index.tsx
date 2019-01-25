import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./App/reducers/reducer";
import AppContainer from './App/containers/AppContainer';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

render(
  <Provider store={store}>
  	<AppContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
