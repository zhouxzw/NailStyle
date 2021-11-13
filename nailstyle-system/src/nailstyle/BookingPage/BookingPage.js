import React from "react";
import "./BookingPage.css";
import NailStyleLogo from "../components/Navbar/logo.svg";
import { useHistory } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Services from "./components/Services/Services";
function BookingPage() {
  const history = useHistory();

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
      <Calendar></Calendar>
      <Services></Services>
    </div>
  );
}

export default BookingPage;
