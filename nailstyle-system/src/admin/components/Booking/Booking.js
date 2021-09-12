import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Booking.css";

const Booking = () => {
  const [date, onChange] = useState(new Date());

  return (
    <div className="booking-container">
      <Calendar
        className={"calender"}
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks={true}
        onChange={onChange}
        value={date}
      />
      {console.log("Date ", date)}
    </div>
  );
};

export default Booking;
