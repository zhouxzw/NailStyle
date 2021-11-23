import React, { useEffect, useState } from "react";
import "./Timeslots.css";

function Timeslots(props) {
  //const slots = props.timeSlots.availability[0]
  const clickedDate = props.clickedDate;
  const [employeeSlot, setEmployeeSlot] = useState();

  useEffect(() => {
    props.timeSlots.availability.forEach((month) => {
      month.days.some((days) => {
        if (days.date === clickedDate) {
          //console.log("clicked date", clickedDate);
          //console.log("days.date", days.date);

          setEmployeeSlot(days);
        }
      });
    });
  }, [clickedDate, props.timeSlots.availability]);

  return (
    <div className="time-slot-container">
      {employeeSlot &&
        employeeSlot.timeSlots.map((times, i) => (
          <div
            className="slot"
            key={"slot" + i}
            onClick={() => {
              props.getTime(times);
            }}
          >
            {times}
          </div>
        ))}
    </div>
  );
}

export default Timeslots;
