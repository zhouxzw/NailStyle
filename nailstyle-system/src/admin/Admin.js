import "./Admin.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LeftNavbar from "./components/LeftNavbar/LeftNavbar";
import Booking from "./components/Booking/Booking";
import Customer from "./components/Customer/Customer";
import Analytic from "./components/Analytic/Analytic";
import Employee from "./components/Employee/Employee";
import { withRouter } from "react-router-dom";

function Display(props) {
  const display = props.display;
  if (display.bookings) {
    return <Booking></Booking>;
  }
  if (display.customers) {
    return <Customer></Customer>;
  }
  if (display.analytics) {
    return <Analytic></Analytic>;
  }
  if (display.employee) {
    return <Employee></Employee>;
  }
}

function Admin() {
  const [tabState, setTabState] = useState([true, false, false, false]);
  const [bookings, setBookings] = useState(true);
  const [customers, setCustomers] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [employee, setEmployee] = useState(false);

  return (
    <div className="page-container">
      <div className="navbar-top-container">
        <Navbar></Navbar>
      </div>

      <div className="content-container">
        <div className="navbar-left-container">
          <LeftNavbar
            links={tabState}
            checkState={{ bookings, customers, analytics, employee }}
            actBooking={(bookings) => setBookings(bookings)}
            actCustomer={(customers) => setCustomers(customers)}
            actAnalytic={(analytics) => setAnalytics(analytics)}
            actEmployee={(employee) => setEmployee(employee)}
          ></LeftNavbar>
        </div>
        <div className="state-container">
          <Display display={{ bookings, customers, analytics, employee }} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Admin);
