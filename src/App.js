import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    </BrowserRouter>
  );
}

// import logo from './trivia.png';
// <div className="App">
//   <header className="App-header">
//     <img src={ logo } className="App-logo" alt="logo" />
//     <p>
//       SUA VEZ
//     </p>
//   </header>
// </div>
