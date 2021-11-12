import React from "react";
import "./BookingPage.css";
import Calendar from "react-calendar";

function BookingPage() {
  return (
    <div className="booking-page-container">
      Booking Page
      <div className="calender">
        <Calendar
          minDate={new Date()}
          prev2Label={null}
          next2Label={null}
          showFixedNumberOfWeeks={true}
          locale={"en-US"}
        ></Calendar>
      </div>
    </div>
  );
}

export default BookingPage;
