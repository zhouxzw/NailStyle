import "./NailStyle.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "../admin/Login";
import Admin from "../admin/Admin";
import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AuthContext, { AuthContextProvider } from "../context/AuthContext";
import Booking from "./BookingPage/BookingPage";

function NailStyle() {
  const { loggedIn } = useContext(AuthContext);
  const [blur, setBlur] = useState(false);

  const blurBackground = {
    filter: "blur(0.8rem)",
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="ns-container">
            <Navbar blurBg={(blur) => setBlur(blur)}></Navbar>
            <div className="blur-effect" style={blur ? blurBackground : null}>
              <About></About>
              <Services></Services>
              <Gallery></Gallery>
              <Contact></Contact>
              <Footer></Footer>
            </div>
          </div>
        </Route>

        <Route path="/admin">
          {loggedIn === false ? <Login></Login> : <Admin></Admin>}
        </Route>

        <Route path="/bookings">
          <Booking></Booking>
        </Route>
      </Switch>
    </Router>
  );
}

export default NailStyle;
