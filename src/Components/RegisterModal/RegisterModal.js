import React from "react";
import "../LoginModal/LoginModal.css";

const RegisterModal = (props) => {
  return (
    <div className={`${props.isShowRegister ? "" : "active"} show modal`}>
      <div className="register-form">
        <div className="form-box">
          <button className="close-button" onClick={props.handleRegisterClick}>
            <i className="fas fa-times"></i>
          </button>
          <form>
            <h1 className="login-text">Register</h1>
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
            <label>First Name</label>
            <br></br>
            <input
              type="text"
              name="firstName"
              className="login-box"
              value={props.firstName}
              onChange={event => props.firstNameInput(event.target.value)}
            />
            <br></br>
            <label>Last Name</label>
            <br></br>
            <input
              type="text"
              name="lastName"
              className="login-box"
              value={props.lastName}
              onChange={event => props.lastNameInput(event.target.value)}
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
              onClick={props.handleRegisterButton}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
