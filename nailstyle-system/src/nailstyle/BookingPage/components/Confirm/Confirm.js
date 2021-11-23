import React from "react";
import "./Confirm.css";
import CurrentBooking from "../Calendar/CurrentBooking/CurrentBooking";

function Confirm(props) {
  return (
    <div className="confirm-container">
      <CurrentBooking
        service={props.bookingInfo.service}
        technician={props.bookingInfo.technician}
        price={props.bookingInfo.price}
        date={props.bookingInfo.date}
        time={props.bookingInfo.time}
      />
      <div className="confirm-nav-container nav">
        <h5>Confirm Appointment</h5>
      </div>
      <div className="customer-details-container">
        <h3>{props.personalInfo.name}</h3>
        <p>{props.personalInfo.email}</p>
        <p>{props.personalInfo.phone}</p>
      </div>
    </div>
  );
}

export default Confirm;
