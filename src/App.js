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
    axios.get('http://138.68.72.169:8000/api/rounds/running').then(response => {
      response.data.drawnNum = String(response.data.drawnNum).split(",");
      this.setState({ round: response.data});
    })
  }
  //novi komentar
  
  render() {
    // const roundR = this.state.round.drawNum.map(number => {
    //   return <p>{number}</p>
    // });
    
    return (
      <div className = "App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path = '/' exact/>
          </Switch>
        </Router>
        <div className="gameContainer">
          {this.state.round ? <CurrentNumbers roundNumbers = {this.state.round.drawnNum} roundEndTime = {this.state.round.finishRoundTime}/> : <a/>}
          
          <TicketNumbers/>
        </div>
      </div>
    );
  }
}

export default App;
