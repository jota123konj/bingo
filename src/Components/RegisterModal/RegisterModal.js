import React from "react";
import "../LoginModal/LoginModal.css";

const RegisterModal = (props) => {
  return (
    <div className={`${props.isShowRegister ? "" : "active"} show modal`}>
      <div className="login-form">
        <div className="form-box">
          <button className="close-button" onClick={props.handleRegisterClick}>
            X
          </button>
          <form>
            <h1 className="login-text">Register</h1>
            <label>Username</label>
            <br></br>
            <input type="text" name="username" className="login-box" />{" "}
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" name="password" className="login-box" />{" "}
            <br></br>
            <input type="submit" value="REGISTER" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
