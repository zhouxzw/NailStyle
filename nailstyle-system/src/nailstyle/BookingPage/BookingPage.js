import React, { useState, useEffect } from "react";
import "./BookingPage.css";
import NailStyleLogo from "../components/Navbar/logo.svg";
import { useHistory } from "react-router-dom";
import Multistepper from "./components/Multistepper/Multistepper";
import Calendar from "./components/Calendar/Calendar";
import Services from "./components/Services/Services";
import Info from "./components/Info/Info";
import Confirm from "./components/Confirm/Confirm";
import axios from "axios";

function BookingPage() {
  const [page, setPage] = useState(1);

  const [service, setService] = useState();
  const [price, setPrice] = useState("-");
  const [technician, setTechnician] = useState();
  const [allTechnicians, setAllTechnicians] = useState([]);
  const [time, setTime] = useState();
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US").replaceAll("/", "-")
  );
  const bookingInfo = {
    service: service,
    price: price,
    technician: technician,
    time: time,
    date: date,
  };

  const [personalInfo, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [timeSlots, setTimeSlots] = useState();

  function nextPage() {
    if (page === 4) return;
    setPage((p) => p + 1);
  }
  function prevPage() {
    if (page === 1) return;
    setPage((p) => p - 1);
  }

  //https://www.tutorialspoint.com/converting-12-hour-format-time-to-24-hour-format-in-javascript
  const convertTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const submitForm = async () => {
    await axios({
      method: "POST",
      data: {
        name: personalInfo.name,
        date: date,
        service: service,
        technician: technician,
        phone: personalInfo.phone,
        time: time,
        email: personalInfo.email,
      },
      url: "https://nailstyle-server.herokuapp.com/book",
      withCredentials: true,
    }).then((res) => {});
  };

  const submitTime = async () => {
    const twentyFourHourTime = convertTime(time);

    await axios({
      method: "POST",
      data: {
        name: technician,
        date: date,
        time: twentyFourHourTime,
      },
      url: "https://nailstyle-server.herokuapp.com/updatetimeslot",
      withCredentials: true,
    }).then((res) => {});
  };

  useEffect(() => {
    async function getEmployeeTimes() {
      const request = await axios.get(
        "https://nailstyle-server.herokuapp.com/employee/times",
        {
          params: {
            name: technician,
          },
        }
      );

      //console.log(request.data);
      setTimeSlots(request.data);
    }

    getEmployeeTimes();
  }, [technician]);

  useEffect(() => {
    async function retrieveEmployees() {
      const response = await axios.get(
        "https://nailstyle-server.herokuapp.com/employees"
      );
      setAllTechnicians(response.data);
    }

    retrieveEmployees();
  }, []);

  //css styling for button for UX
  const buttonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "9px",
    boxShadow: "0 0 15px rgba(33,33,33,.4)",
    transition: "1s ease",
  };

  return (
    <div className="booking-page-container">
      <div className="booking-navbar">
        <img
          className="home-symbol"
          src={NailStyleLogo}
          alt="NailStyle"
          onClick={() => {
            //history.push("/");
            window.location.href = "/";
          }}
        />
      </div>
      <div className="booking-step-container">
        <div className="booking-float-container">
          <Multistepper page={page}></Multistepper>

          {page === 1 && (
            <Services
              getService={(service) => setService(service)}
              getPrice={(price) => setPrice(price)}
              getTech={(technician) => setTechnician(technician)}
              allTechs={allTechnicians}
            ></Services>
          )}
          {page === 2 && (
            <Calendar
              bookingInfo={bookingInfo}
              timeSlots={timeSlots}
              getDate={(date) => setDate(date)}
              clickedDate={date}
              getTime={(time) => setTime(time)}
            ></Calendar>
          )}
          {page === 3 && (
            <Info
              bookingInfo={bookingInfo}
              getInfo={(personalInfo) => setPersonalDetails(personalInfo)}
              personalInfo={personalInfo}
            ></Info>
          )}
          {page === 4 && (
            <Confirm
              bookingInfo={bookingInfo}
              personalInfo={personalInfo}
            ></Confirm>
          )}
        </div>

        <div className="button-container">
          {page !== 1 && (
            <button className="previous-button" onClick={() => prevPage()}>
              Previous
            </button>
          )}
          {page === 4 && (
            <button
              className="finish-button"
              onClick={() => {
                submitForm();
                submitTime();
              }}
            >
              Finish
            </button>
          )}
          {page !== 4 && (
            <button
              className="next-button"
              onClick={() => {
                //console.log(page);

                if (
                  service !== undefined &&
                  technician !== undefined &&
                  page === 1
                ) {
                  nextPage();
                } else if (time !== undefined && page === 2) {
                  nextPage();
                } else if (
                  personalInfo.name !== "" &&
                  personalInfo.phone !== "" &&
                  personalInfo.email !== "" &&
                  page === 3
                ) {
                  nextPage();
                } else {
                  window.alert(
                    "Pleae make sure to select and fill all options"
                  );
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
