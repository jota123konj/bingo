import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const loginClick = () => props.handleLoginClick();
  const registerClick = () => props.handleRegisterClick();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const signinCombine = () => {
    closeMobileMenu(); 
    loginClick();
  }

  const registerCombine = () => {
    closeMobileMenu();
    registerClick();
  }
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Beengo
          </Link>
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
      </nav>
    </div>
  );
}

export default Navbar;

//
