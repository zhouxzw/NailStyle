import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import NailStyleLogo from "./logo.svg";
import { BsList, BsX } from "react-icons/bs";
import { HashLink } from "react-router-hash-link";

function Navbar(props) {
  const navbar = useRef(null);
  const [isActive, setActive] = useState(false);
  const onClick = () => {
    setActive(!isActive);
    props.blurBg(false);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (navbar.current !== null && !navbar.current.contains(e.target)) {
        props.blurBg(false);
        setActive(!isActive); // activate)
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
            onClick={() => {
              setActive(!isActive);
              props.blurBg(true);
            }}
          ></BsList>
          <div className="navbar-menu-container">
            <div
              className={`navbar-menu ${isActive ? "active" : "inactive"}`}
              ref={navbar}
            >
              <div className="home-categories-container">
                <BsX
                  id="mobile-exit"
                  className="mobile-menu-exit"
                  alt="Close Navigation"
                  onClick={onClick}
                ></BsX>
                <ul className="home-categories">
                  <li className="home-link current">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/#home"
                      onClick={onClick}
                    >
                      HOME
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/#about"
                      onClick={onClick}
                    >
                      ABOUT
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/#services"
                      onClick={onClick}
                    >
                      SERVICES
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/#gallery"
                      onClick={onClick}
                    >
                      GALLERY
                    </HashLink>
                  </li>
                  <li className="home-link">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/#contact"
                      onClick={onClick}
                    >
                      CONTACT
                    </HashLink>
                  </li>

                  <li className="nav-book-btn">
                    <HashLink
                      className="hash-link"
                      smooth
                      to="/bookings"
                      onClick={onClick}
                    >
                      BOOK NOW
                    </HashLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
