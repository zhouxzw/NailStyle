import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./Booking.css";

const Booking = () => {
  const [clickedDate, setClickedDate] = useState(() => {
    let initDate = new Date();
    return initDate.toLocaleDateString("en-US").replaceAll("/", "-");
  });
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState();

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    //setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    setClickedDate(selectedDate);
  }

  //Make api request to get all bookings for the 'clicked' date
  useEffect(() => {
    async function fetchNextDate(clickedDate) {
      console.log(clickedDate);

      const request = await axios.get("/bookings", {
        params: {
          date: clickedDate,
        },
      });
      setBookings(request.data);
      console.log("Next Current Bookings:", request.data);
    }
    fetchNextDate(clickedDate);
  }, [clickedDate]);

  return (
    <div className="booking-container">
      <Calendar
        minDate={new Date()}
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks={true}
        onChange={onDateChange}
        value={date}
        locale={"en-US"}
      />

      <div className="booking-slots">
        {bookings &&
          bookings.map((item, i) => (
            <div className="booking-card" key={i}>
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Booking;
