import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
