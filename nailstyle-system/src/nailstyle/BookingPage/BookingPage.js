import React, { useState } from "react";
import "./BookingPage.css";
import NailStyleLogo from "../components/Navbar/logo.svg";
import { useHistory } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Services from "./components/Services/Services";

function BookingPage() {
  const history = useHistory();
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="booking-page-container">
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
      <Calendar getDate={(date) => setDate(date)}></Calendar>
      <Services getService={(service) => setService(service)}></Services>
    </div>
  );
}

export default BookingPage;
