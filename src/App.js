import React, { Component } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginModal from "./Components/LoginModal/LoginModal";
import RegisterModal from "./Components/RegisterModal/RegisterModal";
import axios from "axios";
import Tickets from "./Components/Tickets/Tickets";
import Bingo from "./Bingo";
import Timer from "./Components/Timer/Timer";

function _setHeaders(key, value) {
  localStorage.setItem(key, value);
}
function _getAccessToken(key) {
  return localStorage.getItem(key);
}

function _clearToken() {
  localStorage.clear();
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

  handleLoginButton(event) {
    event.preventDefault();

    const loginData = {
      Username: this.state.username,
      Password: this.state.password,
      // Username: "user3",
      // Password: "12346578",
    };

    axios
      .post(`http://157.230.112.77:8000/api/tokens`, loginData, {
        headers: {
          authorization: localStorage.getItem("session-id"),
          userid: localStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // console.log(res.headers.authorization);
        // console.log(res.headers.userid);
        this.setState({ user: res.data });
        localStorage.setItem("session-id", res.headers.authorization);
        localStorage.setItem("user-id", res.headers.userid);
      });
    this.handleLoginClick();
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

  componentDidMount() {}

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
          <Bingo />
          <Tickets />
        </div>
        <LoginModal
          isShowLogin={this.state.isShowLogin}
          username={this.state.username}
          password={this.state.password}
          usernameInput={this.usernameInput.bind(this)}
          passwordInput={this.passwordInput.bind(this)}
          handleLoginButton={this.handleLoginButton.bind(this)}
          handleLoginClick={this.handleLoginClick.bind(this)}
        ></LoginModal>
        <RegisterModal
          handleRegisterClick={this.handleRegisterClick.bind(this)}
          isShowRegister={this.state.isShowRegister}
        ></RegisterModal>
      </div>
    );
  }
}

export default App;
