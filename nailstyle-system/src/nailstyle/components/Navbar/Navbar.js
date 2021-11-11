import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import NailStyleLogo from "./logo.svg";
import { BsList, BsX } from "react-icons/bs";

function Navbar(props) {
  const sidebar = useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => setActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (sidebar.current !== null && !sidebar.current.contains(e.target))
        setActive(!isActive); // activate)
      props.blurBg(!isActive);
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
                <ul>
                  <li className="home-link current">
                    <a href="#">HOME</a>
                  </li>
                  <li className="home-link">
                    <a href="#">ABOUT</a>
                  </li>
                  <li className="home-link">
                    <a href="#">SERVICES</a>
                  </li>
                  <li className="home-link">
                    <a href="#">GALLERY</a>
                  </li>
                  <li className="home-link">
                    <a href="#">CONTACT</a>
                  </li>

                  <li className="nav-book-btn">
                    <a href="#">BOOK NOW</a>
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
