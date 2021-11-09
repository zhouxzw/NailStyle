import "./NailStyle.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Auth from "../admin/Auth";
import Admin from "../admin/Admin";
import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AuthContext, { AuthContextProvider } from "../context/AuthContext";

function NailStyle() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="ns-container">
            <Navbar></Navbar>
            <Hero></Hero>
            <Services></Services>
            <Gallery></Gallery>
            <Contact></Contact>
            <Footer></Footer>
          </div>
        </Route>

        <Route path="/admin">
          {loggedIn === false ? <Auth></Auth> : <Admin></Admin>}
        </Route>
      </Switch>
    </Router>
  );
}

export default NailStyle;
