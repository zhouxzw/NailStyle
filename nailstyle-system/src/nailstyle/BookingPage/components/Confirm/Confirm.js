import React from "react";
import "./Confirm.css";
import CurrentBooking from "../CurrentBooking/CurrentBooking";

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
        <div>{props.personalInfo.name}</div>
        <div>{props.personalInfo.email}</div>
        <div>{props.personalInfo.phone}</div>
      </div>
    </div>
  );
}

export default Confirm;
