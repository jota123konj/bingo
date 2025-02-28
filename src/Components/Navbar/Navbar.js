import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import UpdateModal from "../UpdateModal/UpdateModal";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [clickLogin, setClickLogin] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const usernameInput = (username) => setUserName(username);
  const firstNameInput = (userfirstName) => setFirstName(userfirstName);
  const lastNameInput = (userLastName) => setLastName(userLastName);
  const passwordInput = (password) => setUserPwd(password);

  const handleClick = (func, param) => {
    func(!param);
    setClick(false);
  };
  const closeMobileMenu = () => {
    setClickRegister(false);
    setClickLogin(false);
    setClickUpdate(false);
  };

  const handleLoginButton = (event) => {
    event.preventDefault();
    let loginData = {
      Username: userName,
      Password: userPwd,
    };
    axios
      .post(`http://165.227.175.177:8000/api/tokens`, loginData, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUserName(res.data.username);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUserBalance(res.data.balance);
        props.loggedBoolSetter(true);
        sessionStorage.setItem("session-id", res.headers.authorization);
        sessionStorage.setItem("user-id", res.headers.userid);
        sessionStorage.setItem("logged-in", "true");
      })
      .catch(() => {
        alert("User information not correct!");
      });
    closeMobileMenu();
  };
  const signOut = () => {
    sessionStorage.clear();
    setUserBalance(0);
    setUserName("");
    setLastName("");
    setFirstName("");
    setUserPwd("");
    props.loggedBoolSetter(false);
    console.log(props.loggedBool);
    //sessionStorage.setItem("logged-in", "false");
  };

  const refresh = () => {
    axios
      .get(`http://165.227.175.177:8000/api/tokens`, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        setUserName(res.data.username);
        setUserBalance(res.data.balance);
      })
      .catch(() => {
        refresh();
      });
  };
  useEffect(() => {
    if (
      sessionStorage.getItem("logged-in") === "true" &&
      userBalance === 0 &&
      userName === ""
    ) {
      console.log("refresh");
      refresh();
    }
  });

  const handleRegisterButton = (event) => {
    event.preventDefault();
    let registerData = {
      username: userName,
      password: userPwd,
      firstName: firstName,
      lastName: lastName,
    };
    axios
      .post(`http://165.227.175.177:8000/api/users`, registerData)
      .then(() => {
        handleLoginButton(event);
      })
      .catch(() => {
        alert("User information not correct!");
      });
    closeMobileMenu();
  };
  const handleBalance = (event) => {
    event.preventDefault();
    let balanceData = {
      balance: balance,
    };
    axios
      .put(`http://165.227.175.177:8000/api/users/balance`, balanceData, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        setUserBalance(res.data.balance);
      })
      .catch(() => {
        alert("User information not correct!");
      });
    closeMobileMenu();
    refresh();
  };

  // const handleUpdateButton = (event) => {
  //   event.preventDefault();
  //     let updateData = {
  //       username: userName,
  //       password: userPwd,
  //       firstName: firstName,
  //       lastName: lastName
  //     }
  //     axios
  //     .put(`http://165.227.175.177:8000/api/users/${sessionStorage.getItem("user-id")}`, updateData, {
  //       headers: {
  //         authorization: sessionStorage.getItem("session-id"),
  //         userid: sessionStorage.getItem("user-id"),
  //       },
  //     })
  //     .then(() => {
  //       handleBalance(event);
  //       handleLoginButton(event);
  //     }).catch(() => {
  //       alert('User information not correct!')
  //       refresh();
  //     });
  //     closeMobileMenu();
  // }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Beengo
          </Link>

          {props.loggedBool === false ? (
            <div>
              <div
                className="menu-icon"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={() => {
                      handleClick(setClickRegister, clickRegister);
                    }}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={() => {
                      handleClick(setClickLogin, clickLogin);
                    }}
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="menu-logged">
              <li className="loggedIn">
                <Link
                  to="/"
                  className="nav-links update"
                  onClick={() => {
                    handleClick(setClickUpdate, clickUpdate);
                  }}
                >
                  {userName}
                </Link>
              </li>
              <li className="loggedIn">Balance: {userBalance}</li>
              <li onClick={signOut} className="signOut">
                Sign Out
              </li>
            </ul>
          )}
        </div>
      </nav>

      <LoginModal
        username={userName}
        usernameInput={usernameInput}
        password={userPwd}
        passwordInput={passwordInput}
        isShowLogin={clickLogin}
        handleLoginClick={closeMobileMenu}
        handleLoginButton={handleLoginButton}
      />
      <RegisterModal
        username={userName}
        usernameInput={usernameInput}
        firstName={firstName}
        firstNameInput={firstNameInput}
        lastName={lastName}
        lastNameInput={lastNameInput}
        password={userPwd}
        passwordInput={passwordInput}
        isShowRegister={clickRegister}
        handleRegisterClick={closeMobileMenu}
        handleRegisterButton={handleRegisterButton}
      />
      <UpdateModal
        balance={balance}
        balanceInput={setBalance}
        isShowUpdate={clickUpdate}
        handleUpdateClick={closeMobileMenu}
        handleUpdateButton={handleBalance}
      />
    </div>
  );
}

export default Navbar;
// () => {
//   axios
//   .post(`http://165.227.175.177:8000/api/tokens`, registerData, {
//   headers: {
//     authorization: sessionStorage.getItem("session-id"),
//     userid: sessionStorage.getItem("user-id"),
//   },
//   })
//   .then((res) => {
//   console.log(res);
//   console.log(res.data);
//   setUserName(res.data.username);
//   setFirstName(res.data.firstName);
//   setLastName(res.data.lastName);
//   setUserBalance(res.data.balance);
//   props.loggedBoolSetter(true);
//   sessionStorage.setItem("session-id", res.headers.authorization);
//   sessionStorage.setItem("user-id", res.headers.userid);
//   sessionStorage.setItem("logged-in", "true");
//   });
// }
