import React from "react";
import "./CurrentBooking.css";

function CurrentBooking(props) {
  const service = props.service;
  const technician = props.technician;
  const price = props.price;
  const date = props.date;
  const time = props.time;

  return (
    <div className="current-booking-container">
      <h4>Your Booking</h4>
      <div className="current-booking-box">
        <div className="current-booking-col">
          <h3>{service}</h3>
          <h4>With {technician}</h4>
        </div>
        <div className="current-booking-col left">
          <h3>${price}</h3>
          <h4>
            {date} @ {time}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default CurrentBooking;
