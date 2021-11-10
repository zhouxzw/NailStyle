import React from "react";
import "./Navbar.css";
import { MdArrowDropDown } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="top-parent-container">
      <div className="logo">NS</div>
      <div className="settings-container">
        <div className="settings">
          <button className="settings-btn">
            Settings
            <MdArrowDropDown className="setting-dropdown"></MdArrowDropDown>
          </button>
        </div>
      </div>
    </div>
  );
}
