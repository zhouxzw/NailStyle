import "./NailStyle.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Auth from "../admin/Auth";
import Protected from "../admin/Protected";
import Admin from "../admin/Admin";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar"

function NailStyle() {
  const [token, setToken] = useState(false);
  console.log("TOKEN ", token);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar></Navbar>
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
