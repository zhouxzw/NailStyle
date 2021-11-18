import React, { useState } from "react";
import "./Multistepper.css";

function Multistepper(props) {
  return (
    <div className="multistep-container">
      <div
        className="circle"
        style={{ backgroundColor: props.page >= 1 ? "#DE7E98" : "#C4C4C4" }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 2 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{ backgroundColor: props.page >= 2 ? "#DE7E98" : "#C4C4C4" }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 3 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{ backgroundColor: props.page >= 3 ? "#DE7E98" : "#C4C4C4" }}
      ></div>
      <hr
        className="bar"
        style={{ backgroundColor: props.page >= 4 ? "#DE7E98" : "#C4C4C4" }}
      ></hr>
      <div
        className="circle"
        style={{ backgroundColor: props.page >= 4 ? "#DE7E98" : "#C4C4C4" }}
      ></div>
    </div>
  );
}

export default Multistepper;
