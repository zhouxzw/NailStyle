import React, { useState, useRef, useEffect, useContext } from "react";
import "./Navbar.css";
import { MdArrowDropDown } from "react-icons/md";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const dropDown = useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => setActive(!isActive);

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function logOut() {
    await axios.get("https://nailstyle-server.herokuapp.com/logout");
    await getLoggedIn();
    history.push("/admin");
  }

  // check for clicks on the page
  useEffect(() => {
    // if the dropdown is active, and where we click isn't inside the drop down
    const pageClickEvent = (e) => {
      if (dropDown.current !== null && !dropDown.current.contains(e.target))
        setActive(!isActive); // activate
    };

    // while dropdown is active, listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    // remove immediately
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className="top-parent-container">
      <div
        className="logo"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        NailStyle
      </div>
      <div className="settings-container">
        <div className="settings">
          <div className="settings-btn-container">
            <button className="settings-btn" onClick={onClick}>
              Settings
              <MdArrowDropDown className="settings-icon"></MdArrowDropDown>
            </button>
            <div
              className={`dropdown-menu ${isActive ? "active" : "inactive"}`}
              ref={dropDown}
            >
              <ul>
                <li>
                  <a onClick={logOut} href="#">
                    Log Out
                  </a>
                </li>
                <li>
                  <a href="#">Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
