import React from "react";
import "./Info.css";

import { useState } from "react";

function Info(props) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.getInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="info-container">
      <form className="info-forms">
        <h4>Enter Personal Information</h4>
        <div className="field-container">
          <div className="input-container input-name">
            <label>FULL NAME</label>
            <input
              className="info-input"
              onChange={handleChange}
              name="name"
              value={props.personalDetails.name}
            ></input>
          </div>
          <div className="input-container">
            <label>PHONE</label>
            <input
              className="info-input"
              onChange={handleChange}
              name="phone"
              value={props.personalDetails.phone}
            ></input>
          </div>
        </div>
        <div className="field-container">
          <div className="input-container">
            <label>EMAIL</label>
            <input
              className="info-input"
              onChange={handleChange}
              name="email"
              value={props.personalDetails.email}
            ></input>
          </div>
        </div>
        <div className="field-container">
          <div className="input-container">
            <label>ADDRESS</label>
            <input
              className="info-input"
              onChange={handleChange}
              name="address"
              value={props.personalDetails.address}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Info;
