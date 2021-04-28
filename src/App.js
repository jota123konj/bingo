import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CurrentNumbers from './Components/CurrentNumbers/CurrentNumbers';
import TicketNumbers from './Components/TicketNumbers/TicketNumbers';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  state = {
    round: {}
  };

  componentDidMount() {
    axios.get(` http://138.68.72.169:8000/api/rounds/running`).then((res) => {
      const round = res.data;
      this.setState({ round });
    });
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
          <CurrentNumbers brojevi = {this.state.round.drawnNum}/>
          <TicketNumbers/>
        </div>
      </div>
    );
  }
}

export default App;
