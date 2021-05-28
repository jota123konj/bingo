import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tickets from "./Components/Tickets/Tickets";
import Bingo from "./Bingo";
import Timer from "./Components/Timer/Timer";



class App extends Component {
  constructor(props){
    super(props);
    this.state = { loggedBool: true}
  }
  loggedSetter = (param) => {
    this.setState({
      loggedBool: param
    })
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar loggedBool = {this.state.loggedBool} loggedBoolSetter = {this.loggedSetter}/>
          <Switch>
            <Route path="/" exact />
          </Switch>
        </Router>
        <Timer></Timer>
        <div className="gameContainer">
          <Bingo />
          <Tickets />
        </div>
      </div>
    );
  }
}
export default App;