import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Tickets from './Tickets';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Bingo from './Bingo';

class App extends Component {

  
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
          <Bingo/>
          <Tickets/>
        </div>
      </div>
    );
  }
}

export default App;
