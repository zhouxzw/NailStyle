import React, { useState } from "react";
import Calendar from "react-calendar";

import "./Booking.css";

const Booking = () => {
  const [date, onChange] = useState(new Date());
  let dateUS;

  //format date (MM/DD/YYYY)
  const formatDate = (date) => {
    dateUS = date.toLocaleDateString("en-US");
  };

  return (
    <div className="booking-container">
      <Calendar
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks={true}
        onChange={onChange}
        value={date}
        onClick={formatDate(date)}
      />
      {console.log(dateUS)}
    </div>
  );
};

export default Booking;
