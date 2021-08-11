import Navbar from "./components/Navbar/Navbar";
import "./Admin.css";
import { useState } from "react";
import Booking from "./components/Booking/Booking"
import Customer from "./components/Customer/Customer"
import Analytic from "./components/Analytic/Analytic"
import Employee from "./components/Employee/Employee"



function Display(props) {
  const display = props.display;
  if(display.bookings) {
    return <Booking></Booking>;
  }
  if(display.customers){
    return <Customer></Customer>
  }
  if(display.analytics){
    return <Analytic></Analytic>
  }
  if(display.employee){
    return <Employee></Employee>
  }
}

function Admin() {
  const [tabState, setTabState] = useState([true, false, false, false]);
  const [bookings, setBookings] = useState(true);
  const [customers, setCustomers] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [employee, setEmployee] = useState(false);

  return (
    <div className="container">
      <div className="navbar-container">
        <Navbar
          links = {tabState}
          checkState = {bookings, customers, analytics, employee}
          actBooking={(bookings) => setBookings(bookings)}
          actCustomer={(customers) => setCustomers(customers)}
          actAnalytic={(analytics) => setAnalytics(analytics)}
          actEmployee={(employee) => setEmployee(employee)}
        ></Navbar>
      </div>
      <div className="content-container">
        <Display display={{bookings, customers, analytics, employee}} />
      </div>
    </div>
  );
}

export default Admin;
