import React from "react";
import "./LoginModal.css";

const LoginModal = (props) => {
  return (
    <div className={`${props.isShowLogin ? "" : "active"} show modal`}>
      <div className="login-form">
        <div className="form-box">
          <button className="close-button" onClick={props.handleLoginClick}>
            <i className="fas fa-times"></i>
          </button>
          <form>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input
              type="text"
              name="username"
              className="login-box"
              value={props.username}
              onChange={event => props.usernameInput(event.target.value)}
            />
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              className="login-box"
              value={props.password}
              onChange={event => props.passwordInput(event.target.value)}
            />
            <br></br>
            <input
              type="submit"
              value="SIGN IN"
              className="login-btn"
              onClick={props.handleLoginButton}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
