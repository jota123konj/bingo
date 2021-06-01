import React from "react";
import "../LoginModal/LoginModal.css";

const UpdateModal = (props) => {
  return (
    <div className={`${props.isShowUpdate ? "" : "active"} show modal`}>
      <div className="login-form">
        <div className="form-box">
          <button className="close-button" onClick={props.handleUpdateClick}>
            <i className="fas fa-times"></i>
          </button>
          <form>
            <h1 className="login-text">Balance</h1>
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
