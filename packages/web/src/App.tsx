import React from 'react';
import { Utility } from "shared-ts/src/some-shared-code"
import { OtherUtility } from "shared-js"
import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {Utility("snowpack is awesome!")}
        {OtherUtility("but cross workspace typescript doesn't work yet")}
      </header>
    </div>
  );
}

export default App;
