import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { addMonths } from "../../../../admin/components/Booking/Booking";
import Timeslots from "../Timeslots/Timeslots";
import CurrentBooking from "../CurrentBooking/CurrentBooking";

function Calender(props) {
  let maxDate = new Date(addMonths(new Date(), 1).toString());

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    //setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    props.getDate(selectedDate);
  }

  return (
    <div className="schedule-selection-container">
      <CurrentBooking
        service={props.bookingInfo.service}
        technician={props.bookingInfo.technician}
        price={props.bookingInfo.price}
        date={props.bookingInfo.date}
        time={props.bookingInfo.time}
      ></CurrentBooking>
      <div className="schedule-nav-container nav">
        <h5>Select Date and Time</h5>
        <h4>DATE</h4>
      </div>

      <div className="calendar">
        <Calendar
          minDate={new Date()}
          maxDate={maxDate}
          prev2Label={null}
          next2Label={null}
          showFixedNumberOfWeeks={true}
          locale={"en-US"}
          onChange={onDateChange}
        ></Calendar>
        <Timeslots
          clickedDate={props.clickedDate}
          timeSlots={props.timeSlots}
          getTime={props.getTime}
        ></Timeslots>
      </div>

      <div className="time-slots-container">
        <h4>TIME</h4>
        <Timeslots
          clickedDate={props.clickedDate}
          timeSlots={props.timeSlots}
          getTime={props.getTime}
        ></Timeslots>
      </div>
    </div>
  );
}

export default Calender;
