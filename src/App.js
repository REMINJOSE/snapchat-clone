import React from 'react';
import Chats from './Chats'
import WebcamCapture from './WebcamCapture';
import ChatView from './ChatView';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from "./Preview";

function App() {
  return (
    <div className="app">
     <Router>
      <div className="app__body">
        <Switch>
          <Route path="/chats/view">
            <ChatView/>
          </Route>
          <Route path="/chats">
            <Chats/>
          </Route>
          <Route path="/preview">
            <Preview/>
          </Route>
          <Route exact path="/">
            <WebcamCapture/>
          </Route>
        </Switch>
      </div>
    </Router>    
    </div>
  );
}

export default App;
