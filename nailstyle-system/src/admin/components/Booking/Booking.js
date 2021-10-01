import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./Booking.css";

const Booking = () => {
  const [clickedDate, setClickedDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState();

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    setClickedDate(selectedDate);
  }

  //On render set the current date
  //Make api request to get all the bookings for current date
  useEffect(() => {
    const getToday = new Date();
    let currentDate = getToday.toLocaleDateString("en-US").replaceAll("/", "-");

    async function fetchToday(currentDate) {
      const request = await axios.get("/bookings", {
        params: {
          date: currentDate,
        },
      });
      setBookings(request.data);
      console.log("Current Bookings:", request.data);
      return request;
    }
    fetchToday(currentDate);
  }, []);

  useEffect(() => {
    async function fetchToday(clickedDate) {
      const request = await axios.get("/bookings", {
        params: {
          date: clickedDate,
        },
      });
      setBookings(request.data);
      console.log("Next Current Bookings:", request.data);
      return request;
    }
    fetchToday(clickedDate);
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
    </div>
  );
};

export default Booking;
