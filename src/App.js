import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CurrentNumbers from './Components/CurrentNumbers/CurrentNumbers';
import TicketNumbers from './Components/TicketNumbers/TicketNumbers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  state = {
    brojevi: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
  }
  render() {
    return (
      <div className = "App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path = '/' exact/>
          </Switch>
        </Router>
        <div className="gameContainer">
          <CurrentNumbers brojevi = {this.state.brojevi}/>
          <TicketNumbers/>
        </div>
      </div>
    );
  }
}

export default App;
