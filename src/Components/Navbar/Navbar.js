import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`http://157.230.112.77:8000/api/tokens`, {
        headers: {
          authorization: localStorage.getItem("session-id"),
          userid: localStorage.getItem("user-id"),
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  });
  const loginClick = () => props.handleLoginClick();
  const registerClick = () => props.handleRegisterClick();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const signinCombine = () => {
    closeMobileMenu();
    loginClick();
  };

  const registerCombine = () => {
    closeMobileMenu();
    registerClick();
  };
  const signOut = () => {
    setUser(null);
    localStorage.clear()
  }
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Beengo
          </Link>
          {user == null ? (
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
            
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

//
