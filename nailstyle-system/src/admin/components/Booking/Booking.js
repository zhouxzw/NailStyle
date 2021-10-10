import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./Booking.css";
import { BsX, BsChevronRight } from "react-icons/bs";

const Booking = () => {
  const [clickedDate, setClickedDate] = useState(() => {
    let initDate = new Date();
    return initDate.toLocaleDateString("en-US").replaceAll("/", "-");
  });
  const [bookings, setBookings] = useState();

  const [paymentButton, setPaymentButton] = useState();
  const [showInput, setShowInput] = useState(false);

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    //setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    setClickedDate(selectedDate);
  }

  //process payment once a customer has finished their service
  //store client info for future visits
  function processAppt(item, key) {
    setPaymentButton(key);
    setShowInput(true);
  }

  const paymentAni = {
    background: "red",
  };

  //Make api request to get all bookings for the 'clicked' date
  useEffect(() => {
    async function fetchNextDate(clickedDate) {
      console.log(clickedDate);

      const request = await axios.get("/bookings", {
        params: {
          date: clickedDate,
        },
      });
      request.data.sort(function (a, b) {
        return (
          new Date("2021/12/12 " + a.time) - new Date("2021/12/12 " + b.time)
        );
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
        locale={"en-US"}
      />

      <div className="booking-slots">
        {bookings &&
          bookings.map((item, i) => (
            <div className="booking-card" key={i}>
              <div className="card-head">
                <div>{item.time}</div>
                <BsX className="cancel-button"></BsX>
              </div>
              <div className="card-body">
                <div className="body-left-content">
                  <div>Name: {item.name}</div>
                  <div>Service: {item.service}</div>
                  <div>Technician: {item.technician}</div>
                </div>
                <div className="body-right-content">
                  <div
                    className="payment-button"
                    buttonKey={i}
                    onClick={() => processAppt(item, i)}
                    style={paymentButton === i ? paymentAni : null}
                  >
                    {showInput ? null : <div>continue to payment</div>}
                    {showInput ? null : <BsChevronRight></BsChevronRight>}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Booking;
