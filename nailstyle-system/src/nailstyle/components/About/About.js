import "./About.css";
import React from "react";

export default function About() {
  return (
    <div className="about-parent-ctn" id="about">
      <hr className="line" />
      <div className="about-ctn">
        <span className="header">Nails cut in comfort and harmony</span>

        <div className="about-desc">
          <p className="header-paragraph">
            At NailStyle, we pride ourselves in providing a memorable experience
            inside our salon to make you feel more confident outside. With our
            technical expertise, dedicated staff and comforting environment,
            your certainty is guaranteed.{" "}
          </p>
        </div>
      </div>
      <hr className="line" />
      <div className="hero-btn-ctn">
        <button href="#" className="hero-btn">
          Book Now
        </button>
        <button href="#" className="hero-btn">
          Contact Us
        </button>
      </div>
    </div>
  );
}
