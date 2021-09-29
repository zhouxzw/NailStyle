import "./NailStyle.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Auth from "../admin/Auth";
import Protected from "../admin/Protected";
import Admin from "../admin/Admin";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";

function NailStyle() {
  const [token, setToken] = useState(false);
  console.log("TOKEN ", token);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="ns-container">
            <Navbar></Navbar>
            <Hero></Hero>
            <Services></Services>
          </div>
        </Route>
        <Route path="/adminlogin">
          <Auth authenticate={(token) => setToken(token)}></Auth>
        </Route>
        <Protected path="/admin" auth={token} component={Admin}></Protected>
      </Switch>
    </Router>
  );
}

export default NailStyle;
