import './NailStyle.css';
import {
  BrowserRouter as Router, Route
} from "react-router-dom";

import Admin from "../admin/Admin"

function NailStyle() {
  return (
    <Router>
      <Route path="/" exact>
        <div className="parent-container">This is the main dicky</div>
      </Route>
      <Route path="/admin" component={Admin}></Route>
    </Router>
  );
}

export default NailStyle;
