import "./About.css";
import React from "react";
import { useHistory } from "react-router";

export default function About() {
  const history = useHistory();

  return (
    <div className="about-parent-ctn" id="about">
      <div className="about-desktop-formatter">
        <div className="about-ctn">
          <h1 className="about-header">
            Let Your Nails <span>Glow</span>
          </h1>

          <div className="about-desc">
            <p className="about-paragraph">
              At NailStyle, we pride ourselves in providing a memorable
              experience inside our salon to make you feel more confident
              outside. Let us help you connect with your own beauty.{" "}
            </p>
          </div>
          <div className="hero-btn-ctn">
            <button
              className="hero-btn"
              onClick={() => {
                history.push("/bookings");
              }}
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="about-svg"></div>
      </div>
    </div>
  );
}
