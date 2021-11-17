import React from "react";
import "./Info.css";
function Info(props) {
  return (
    <div className="info-container">
      <form className="info-forms">
        <h4>Enter Personal Information</h4>
        <div className="field-container">
          <div className="input-container input-name">
            <label>FULL NAME</label>
            <input className="info-input"></input>
          </div>
          <div className="input-container">
            <label>EMAIL</label>
            <input className="info-input"></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Info;
