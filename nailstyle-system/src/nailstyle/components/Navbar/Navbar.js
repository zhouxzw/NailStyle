import "./Navbar.css";
import NailStyleLogo from "./logo.svg";
import { BsList, BsX } from "react-icons/bs";

function Navbar() {
  return (
    <div className="home-parent-ctn">
      <div className="home-navbar-ctn">
        <div className="logo-ctn">
          <a href="#">
            <img className="home-logo" src={NailStyleLogo} alt="NailStyle" />
          </a>
        </div>
        <BsList
          id="mobile-cta"
          className="mobile-menu"
          alt="Open Navigation"
          onClick={() => {
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
        ></BsList>

        <nav>
          <BsX
            id="mobile-exit"
            className="mobile-menu-exit"
            alt="Close Navigation"
          ></BsX>

          <ul className="home-ctgs">
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
        </nav>
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
