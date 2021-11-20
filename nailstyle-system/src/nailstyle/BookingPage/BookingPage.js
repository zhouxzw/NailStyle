import React, { useState, useEffect0 } from "react";
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
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [service, setService] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function nextPage() {
    if (page === 4) return;
    setPage((p) => p + 1);
  }
  function prevPage() {
    if (page === 1) return;
    setPage((p) => p - 1);
  }

  const submitForm = async () => {
    await axios({
      method: "POST",
      data: {
        name: personalDetails.name,
        date: date,
        service: service,
        technician: technician,
        phone: personalDetails.phone,
        time: time,
        email: personalDetails.email,
      },
      url: "http://localhost:4000/login",
      withCredentials: true,
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <div className="booking-page-container">
      {date}
      {service}
      {technician}
      <div className="booking-navbar">
        <img
          className="home-symbol"
          src={NailStyleLogo}
          alt="NailStyle"
          onClick={() => {
            history.push("/");
          }}
        />
      </div>
      <div className="booking-step-container">
        <Multistepper page={page}></Multistepper>

        {page === 1 && <Calendar getDate={(date) => setDate(date)}></Calendar>}
        {page === 2 && (
          <Services
            getService={(service) => setService(service)}
            getTech={(technician) => setTechnician(technician)}
          ></Services>
        )}
        {page === 3 && (
          <Info
            getInfo={(personalDetails) => setPersonalDetails(personalDetails)}
            personalDetails={personalDetails}
          ></Info>
        )}
        {page === 4 && <Confirm></Confirm>}
        <div className="button-container">
          <button className="previous-button" onClick={() => prevPage()}>
            Previous
          </button>
          {
            <button className="next-button" onClick={() => nextPage()}>
              Next
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
