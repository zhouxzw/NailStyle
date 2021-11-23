import React from "react";
import "./Info.css";
import CurrentBooking from "../CurrentBooking/CurrentBooking";
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
        <CurrentBooking
          service={props.bookingInfo.service}
          technician={props.bookingInfo.technician}
          price={props.bookingInfo.price}
          date={props.bookingInfo.date}
          time={props.bookingInfo.time}
        />
        <div className="info-nav-container nav">
          <h5>Enter Personal Information</h5>
        </div>
        <div className="field-container">
          <div className="input-container input-name">
            <label>FULL NAME</label>
            <input
              className="info-input"
              onChange={handleChange}
              name="name"
              value={props.personalInfo.name}
            ></input>
          </div>
          <div className="input-container">
            <label>PHONE</label>
            <input
              className="info-input"
              onChange={handleChange}
              value={props.personalInfo.phone}
              name="phone"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
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
              value={props.personalInfo.email}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Info;
