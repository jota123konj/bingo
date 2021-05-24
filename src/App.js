
import React, { Component } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginModal from "./Components/LoginModal/LoginModal";
import RegisterModal from "./Components/RegisterModal/RegisterModal";
import axios from "axios";
import Tickets from './Components/Tickets/Tickets';
import Bingo from './Bingo';
import Timer from './Components/Timer/Timer';

const instance = axios.create({
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
  },
});

function _setToken(token) {
  localStorage.setItem("access_token", token);
}
function _getAccessToken() {
  return localStorage.getItem("access_token");
}

function _clearToken() {
  localStorage.removeItem("access_token");
}

class App extends Component {
  state = {
    username: "",
    password: "",
    round: {},
    isShowLogin: false,
    isShowRegister: false,
  };

  usernameInput(event) {
    this.setState({ username: event.target.value });
  }
  passwordInput(event) {
    this.setState({ password: event.target.value });
  }
  handleLoginButton(event) {
    event.preventDefault();

    const loginData = {
      // Username: this.username,
      // Password: this.Password,
      // Username: "user3",
      // Password: "12346578",
      SelectedNum: "2,33,31,3,23,48",
      Stake: 99.5,
    };

    instance
      // .post(`http://138.68.72.169:8000/api/tokens`, loginData)

      // .post(`http://localhost:3000/api/tokens`, loginData, {
      .post(`http://138.68.72.169:8000/api/tickets`, loginData, {
        headers: {
          authorization: localStorage.getItem("session-id"),
          userid: localStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.headers.authorization);
        console.log(res.headers.userid);
        // localStorage.setItem("session-id", res.headers.authorization);
        // localStorage.setItem("user-id", res.headers.userid);

        // document.cookie = "session-id=" + res.headers.authorization;
        // document.cookie = "user-id=" + res.headers.userid;

        // _setToken(res.headers.authorization);
      });
  }
  handleLoginClick() {
    this.setState({ username: "", password: "" });

    if (this.state.isShowRegister) {
      this.setState({
        isShowRegister: !this.state.isShowRegister,
      });
    }
    this.setState({ isShowLogin: !this.state.isShowLogin });
  }

  handleRegisterClick() {
    this.setState({ username: "", password: "" });
    if (this.state.isShowLogin)
      this.setState({ isShowLogin: !this.state.isShowLogin });
    this.setState({
      isShowRegister: !this.state.isShowRegister,
    });
  }

  componentDidMount() {
    instance.get(`http://138.68.72.169:8000/api/rounds/running`).then((res) => {
      const round = res.data;
      this.setState({ round: round });
    });
  }


  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            handleLoginClick={this.handleLoginClick.bind(this)}
            handleRegisterClick={this.handleRegisterClick.bind(this)}
          />
          <Switch>
            <Route path="/" exact />
          </Switch>
        </Router>
        <Timer></Timer>
        <div className="gameContainer">
          <Bingo/>
          <Tickets/>
        </div>
        <LoginModal
          isShowLogin={this.state.isShowLogin}
          username={this.state.username}
          password={this.state.password}
          usernameInput={this.usernameInput.bind(this)}
          passwordInput={this.passwordInput.bind(this)}
          handleLoginButton={this.handleLoginButton.bind(this)}
        ></LoginModal>
        <RegisterModal
          isShowRegister={this.state.isShowRegister}
        ></RegisterModal>
      </div>
    );
  }
}

export default App;