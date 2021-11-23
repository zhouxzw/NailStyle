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
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [service, setService] = useState("");
  const [price, setPrice] = useState("-");
  const [technician, setTechnician] = useState("");
  const [time, setTime] = useState("");
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
      url: "http://localhost:4000/login",
      withCredentials: true,
    }).then((res) => {
      console.log("res", res);
    });
  };

  useEffect(() => {
    async function getEmployeeTimes() {
      const request = await axios.get("/employee/times", {
        params: {
          name: technician,
        },
      });

      console.log(request.data);
      setTimeSlots(request.data);
    }

    getEmployeeTimes();
  }, [technician]);

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
      <div className="booking-step-container">
        <div className="booking-float-container">
          <Multistepper page={page}></Multistepper>

          {page === 1 && (
            <Services
              getService={(service) => setService(service)}
              getPrice={(price) => setPrice(price)}
              getTech={(technician) => setTechnician(technician)}
            ></Services>
          )}
          {page === 2 && (
            <Calendar
              bookingInfo={bookingInfo}
              personalInfo={personalInfo}
              getDate={(date) => setDate(date)}
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
            <button className="finish-button" onClick={() => nextPage()}>
              Finish
            </button>
          )}
          {page !== 4 && (
            <button className="next-button" onClick={() => nextPage()}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
