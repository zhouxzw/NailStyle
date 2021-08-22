import "./NailStyle.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "../admin/Auth";

function NailStyle() {
  return (
    <Router>
      <Route path="/" exact>
        <div className="parent-container">This is the main dicky</div>
      </Route>
      <Route path="/adminlogin" component={Auth}></Route>
    </Router>
  );
}

export default NailStyle;
