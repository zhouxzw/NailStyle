import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./Booking.css";
import { BsX, BsChevronRight } from "react-icons/bs";

//function from https://stackoverflow.com/questions/2706125/javascript-function-to-add-x-months-to-a-date
export function addMonths(date, months) {
  let d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date;
}

const Booking = () => {
  const [clickedDate, setClickedDate] = useState(() => {
    let initDate = new Date();
    return initDate.toLocaleDateString("en-US").replaceAll("/", "-");
  });
  const [bookings, setBookings] = useState();

  const [serivcePrice, setServicePrice] = useState(0.0);

  let maxDate = new Date(addMonths(new Date(), 2).toString());

  //format clicked date to (MM/DD/YYYY)
  function onDateChange(newDate) {
    //setDate(newDate);
    let selectedDate = newDate.toLocaleDateString("en-US").replaceAll("/", "-");
    setClickedDate(selectedDate);
  }

  //function to make a delete request
  async function deleteBooking(phone, index) {
    //after processing remove the card
    const filterBookings = bookings.filter((item, i) => {
      return i !== index;
    });
    //update state of bookings
    setBookings(filterBookings);

    const delResponse = await axios.delete("/deletebooking", {
      params: {
        phone: phone,
      },
    });
  }

  //process payment once a customer has finished their service
  //store client info for future visits

  async function processAppt(client, index) {
    const response = await axios.patch("/processappointment", {
      name: client.name,
      phone: client.phone,
      email: client.email,
      visits: [
        {
          appointment: {
            date: client.date,
            service: client.service,
            technician: client.technician,
            price: serivcePrice,
          },
        },
      ],
    });

    //Remove the processed booking from database
    deleteBooking(client.phone, index);
  }

  //Make api request to get all bookings for the 'clicked' date
  useEffect(() => {
    async function fetchNextDate(clickedDate) {
      //console.log(clickedDate);

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
      //console.log("Next Current Bookings:", request.data);
    }
    fetchNextDate(clickedDate);
  }, [clickedDate]);

  return (
    <div className="booking-container">
      <div className="calender-size" style={{ width: "50vw" }}>
        <Calendar
          minDate={new Date()}
          maxDate={maxDate}
          prev2Label={null}
          next2Label={null}
          showFixedNumberOfWeeks={true}
          onChange={onDateChange}
          locale={"en-US"}
        />
      </div>

      <div className="booking-slots">
        {bookings &&
          bookings.map((client, i) => (
            <div className="booking-card" cardid={i} key={i}>
              <div className="card-head">
                <div>{client.time}</div>
                <BsX
                  className="cancel-button"
                  onClick={() => deleteBooking(client.phone, i)}
                ></BsX>
              </div>
              <div className="card-body">
                <div className="body-left-content">
                  <div>Name: {client.name}</div>
                  <div>Service: {client.service}</div>
                  <div>Technician: {client.technician}</div>
                  <div className="right-flex">
                    <div>
                      <label>Price</label>
                      <input
                        className="price-input"
                        placeholder="$CAD"
                        type="text"
                        maxLength="6"
                        onChange={(event) =>
                          setServicePrice(event.target.value)
                        }
                      ></input>
                    </div>
                    <div className="body-right-content">
                      <div
                        className="payment-button"
                        onClick={() => processAppt(client, i)}
                      >
                        <div>process payment</div>
                        <BsChevronRight></BsChevronRight>
                      </div>
                    </div>
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
