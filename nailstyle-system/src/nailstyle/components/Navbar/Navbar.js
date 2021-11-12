import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import NailStyleLogo from "./logo.svg";
import { BsList, BsX } from "react-icons/bs";
import { HashLink } from "react-router-hash-link";

function Navbar(props) {
  const sidebar = useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => {
    setActive(!isActive);
    props.blurBg(!isActive);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (sidebar.current !== null && !sidebar.current.contains(e.target)) {
        setActive(!isActive); // activate)
        props.blurBg(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  /**
   * onClick={() => {
            const mobileHam = document.getElementById("mobile-cta");
            const mobileExit = document.getElementById("mobile-exit");
            const nav = document.querySelector("nav");

            mobileHam.addEventListener("click", () => {
              nav.classList.add("menu-btn");
            });
            mobileExit.addEventListener("click", () => {
              nav.classList.remove("menu-btn");
            });
          }}
   */

  return (
    <div className="home-parent-ctn">
      <div className="home-navbar-ctn">
        <div className="logo-ctn">
          <a href="#">
            <img className="home-logo" src={NailStyleLogo} alt="NailStyle" />
          </a>
        </div>
        <div className="home-menu-container">
          <BsList
            id="mobile-cta"
            className="mobile-menu-icon"
            alt="Open Navigation"
            onClick={onClick}
          ></BsList>
          <div className="sidebar-menu-container">
            <div
              className={`sidebar-menu ${isActive ? "active" : "inactive"}`}
              ref={sidebar}
            >
              <div className="test">
                <BsX
                  id="mobile-exit"
                  className="mobile-menu-exit"
                  alt="Close Navigation"
                  onClick={onClick}
                ></BsX>
                <ul className="home-ctgs">
                  <li className="home-link current">
                    <HashLink className="hash-link" smooth to="/#home">
                      HOME
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink className="hash-link" smooth to="/#about">
                      ABOUT
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink className="hash-link" smooth to="/#services">
                      SERVICES
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink className="hash-link" smooth to="/#gallery">
                      GALLERY
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink className="hash-link" smooth to="/#contact">
                      CONTACT
                    </HashLink>
                  </li>

                  <li className="nav-book-btn">
                    <HashLink className="hash-link" smooth to="/bookings">
                      BOOK NOW
                    </HashLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        <div className="home-landing-container">
        <div className="landing-bg">
            <div className="home-slogan">Let Your Nails Glow</div>
            <div className="home-sub-slogan">With Captivating Services from Peace River</div>
            <div className="home-book-btn">Book an Appointment</div>
        </div>
        
        </div>
        */}
    </div>
  );
}

export default Navbar;
