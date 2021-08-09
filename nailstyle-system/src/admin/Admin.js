import Navbar from "./components/Navbar/Navbar";
import "./Admin.css";
import { useState } from "react";

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
          book = {bookings}
          customer = {customers}
          analytic = {analytics}
          employee = {employee}
          actBooking={(bookings) => setBookings(bookings)}
          actCustomer={(customers) => setCustomers(customers)}
          actAnalytic={(analytics) => setAnalytics(analytics)}
          actEmployee={(employee) => setEmployee(employee)}
        ></Navbar>
      </div>
      <div className="content-container">
          <div>{String(employee)}</div>
      </div>
    </div>
  );
}

export default Admin;
