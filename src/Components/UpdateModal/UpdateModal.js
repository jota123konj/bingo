import React from "react";
import "../LoginModal/LoginModal.css";

const UpdateModal = (props) => {
  return (
    <div className={`${props.isShowRegister ? "" : "active"} show modal`}>
      <div className="update-form">
        <div className="form-box">
          <button className="close-button" onClick={props.handleUpdateClick}>
            <i className="fas fa-times"></i>
          </button>
          <form>
            <h1 className="login-text">Edit info</h1>
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
            <label>Balance</label>
            <br></br>
            <input
              type="text"
              name="balance"
              className="login-box"
              value={props.balance}
              onChange={event => props.balanceInput(event.target.value)}
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
              value="UPDATE"
              className="login-btn"
              onClick={props.handleUpdateButton}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
