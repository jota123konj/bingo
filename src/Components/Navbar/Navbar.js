import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

function Navbar(props) {
  const [click, setClick] = useState(false)
  const [clickLogin, setClickLogin] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userBalance, setUserBalance]  = useState(0);
  const usernameInput = (username) => setUserName(username);
  const passwordInput = (password) => setUserPwd(password);

  const handleClick = (func, param) => {
    func(!param);
    setClick(false)
    }
  const closeMobileMenu = () => {
    setClickRegister(false);
    setClickLogin(false);
  }
  
  
  const handleLoginButton = (event) => {
    event.preventDefault();
    if (userName && userPwd) {
      let loginData = {
        Username: userName,
        Password: userPwd
      }
      axios
      .post(`http://157.230.112.77:8000/api/tokens`, loginData, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUserName(res.data.username);
        setUserBalance(res.data.balance);
    props.loggedBoolSetter(true);
        sessionStorage.setItem("session-id", res.headers.authorization);
        sessionStorage.setItem("user-id", res.headers.userid);
        sessionStorage.setItem("logged-in", "true");
      });
      closeMobileMenu();
    }
  }
  const signOut = () => {
    sessionStorage.clear();
    setUserBalance(0);
    setUserName("");
    setUserPwd("");
    props.loggedBoolSetter(false);
    console.log(props.loggedBool);
    //sessionStorage.setItem("logged-in", "false");

  }
  
  const gokurac=()=>{
    axios
      .get(`http://157.230.112.77:8000/api/tokens`, {
        headers: {
          authorization: sessionStorage.getItem("session-id"),
          userid: sessionStorage.getItem("user-id"),
        },
      }).then((res)=>{
        setUserName(res.data.username);
        setUserBalance(res.data.balance);
      });
  }
  
  if(sessionStorage.getItem("logged-in")==="true"){
    gokurac();
  }
  
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Beengo
          </Link>


          {props.loggedBool === false ? 
          <div>
            <div className="menu-icon" onClick={() => {setClick(!click)}}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className = 'nav-item'>
                <Link
                  to="/Register"
                  className="nav-links"
                  onClick={() => {handleClick(setClickRegister, clickRegister)}}
                  >
                  Register
                </Link>
              </li>
              <li className = 'nav-item'>
                <Link
                  to="/SignIn"
                  className="nav-links"
                  onClick={() => {handleClick(setClickLogin, clickLogin)}}
                  >
                  Sign in
                </Link>
              </li>
            </ul>
          </div> :
          <ul className = "menu-logged">
            <li className = 'loggedIn'>{userName}</li>
            <li className = 'loggedIn'>Balance: {userBalance}</li>
            <li onClick = {signOut} className = 'signOut'>Sign Out</li>
          </ul>
        }
        </div>
      </nav>
      
      
      <LoginModal
        username = {userName}
        usernameInput = {usernameInput}
        password = {userPwd}
        passwordInput = {passwordInput}
        isShowLogin = {clickLogin}
        handleLoginClick = {closeMobileMenu}
        handleLoginButton = {handleLoginButton}
      />
      <RegisterModal
        isShowRegister = {clickRegister}
        handleRegisterClick = {closeMobileMenu}
      />
    </div>
  );
}

export default Navbar;
// <nav className = "navbar-logged">
//   <div className="container-logged">
//   </div>
// </nav>
          
          {/* {user == null ? (
          <div className = 'navbar-container'>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/Register"
                    className="nav-links"
                    onClick={registerCombine}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/SignIn"
                    className="nav-links"
                    onClick={signinCombine}
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <div className = 'loggedIn'>{user.username}</div>
                <div className = 'loggedIn'>Balance: {user.balance}</div>
                <button onClick = {signOut}className = 'signOut'>Sign Out</button>

              </li>
            </ul>
            
          )} */}