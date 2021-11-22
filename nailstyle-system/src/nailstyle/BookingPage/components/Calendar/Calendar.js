import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { addMonths } from "../../../../admin/components/Booking/Booking";

function Calender(props) {
  let maxDate = new Date(addMonths(new Date(), 1).toString());

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    //setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    props.getDate(selectedDate);
  }

  return (
    <div className="calender">
      <Calendar
        minDate={new Date()}
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks={true}
        locale={"en-US"}
        onChange={onDateChange}
      ></Calendar>
    </div>
  );
}

export default Calender;
