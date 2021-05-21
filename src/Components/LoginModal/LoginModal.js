import React from "react";
import "./LoginModal.css";

const LoginModal = (props) => {
  return (
    <div className={`${props.isShowLogin ? "" : "active"} show modal`}>
      <div className="login-form">
        <div className="form-box solid">
          <form>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input
              type="text"
              name="username"
              className="login-box"
              value={props.username}
              onChange={props.usernameInput}
            />{" "}
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              className="login-box"
              value={props.password}
              onChange={props.passwordInput}
            />{" "}
            <br></br>
            <input
              type="submit"
              value="LOGIN"
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
