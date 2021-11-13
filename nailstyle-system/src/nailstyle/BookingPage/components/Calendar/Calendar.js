import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

function Calender(props) {
  //function from https://stackoverflow.com/questions/2706125/javascript-function-to-add-x-months-to-a-date
  function addMonths(date, months) {
    let d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return date;
  }

  let maxDate = new Date(addMonths(new Date(), 2).toString());

  return (
    <div className="calender-container">
      <div className="calender">
        <Calendar
          minDate={new Date()}
          maxDate={maxDate}
          prev2Label={null}
          next2Label={null}
          showFixedNumberOfWeeks={true}
          locale={"en-US"}
        ></Calendar>
      </div>
    </div>
  );
}

export default Calender;
