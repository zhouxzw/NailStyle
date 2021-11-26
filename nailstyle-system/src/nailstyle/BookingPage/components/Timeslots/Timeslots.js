import React, { useEffect, useState } from "react";
import "./Timeslots.css";

function Timeslots(props) {
  //const slots = props.timeSlots.availability[0]
  const clickedDate = props.clickedDate;
  const [employeeSlot, setEmployeeSlot] = useState();

  function toggleTime(index) {
    let timeSlotCopy = employeeSlot.map((time) => {
      time.toggle = false;
      return time;
    });
    timeSlotCopy[index].toggle = true;
    setEmployeeSlot(timeSlotCopy);
  }

  //https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
  function formatTime(time) {
    const formattedTime = new Date(
      "2021-01-01T" + time + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    props.getTime(formattedTime);
  }

  useEffect(() => {
    props.timeSlots.availability.forEach((month) => {
      month.days.some((days) => {
        if (days.date === clickedDate) {
          //needed to map the array into an object array so the object can have a toggle property
          let copy = days.timeSlots.map((time) => {
            return { time: time, toggle: false };
          });
          setEmployeeSlot(copy);
        }
      });
    });
  }, [clickedDate, props.timeSlots.availability]);

  return (
    <div className="time-slot-container">
      {employeeSlot &&
        employeeSlot.map((times, i) => (
          <div
            className="slot"
            key={"slot" + i}
            style={times.toggle ? { backgroundColor: "#E1B0BD" } : null}
            onClick={() => {
              toggleTime(i);
              formatTime(times.time);
            }}
          >
            {times.time}
          </div>
        ))}
    </div>
  );
}

export default Timeslots;
