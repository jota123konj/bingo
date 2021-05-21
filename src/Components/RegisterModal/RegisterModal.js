import React from "react";
import "./RegisterModal.css";

const RegisterModal = (props) => {
  return (
    <div className={`${props.isShowRegister ? "" : "active"} show modal`}>
      <div className="login-form">
        <div className="form-box solid">
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
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
