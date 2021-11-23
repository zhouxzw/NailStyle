import React, { useState } from "react";
import "./Multistepper.css";

function Multistepper(props) {
  function toggleColor(page) {
    let style = null;
    switch (page) {
      case 1:
        style = {
          border:
            props.page >= 1 ? "2px solid rgba(223, 126, 152, 0.50)" : "none",
          backgroundColor: props.page >= 1 ? "#DE7E98" : "#C4C4C4",
        };
        break;
      case 2:
        style = { backgroundColor: props.page >= 2 ? "#DE7E98" : "#C4C4C4" };
        break;
      case 3:
        style = { backgroundColor: props.page >= 3 ? "#DE7E98" : "#C4C4C4" };
        break;
      case 4:
        style = { backgroundColor: props.page >= 4 ? "#DE7E98" : "#C4C4C4" };
        break;
    }
    return style;
  }

  return (
    <div className="multistep-container">
      <div className="circle" style={toggleColor(1)}></div>
      <hr className="bar" style={toggleColor(2)}></hr>
      <div className="circle" style={toggleColor(2)}></div>
      <hr className="bar" style={toggleColor(3)}></hr>
      <div className="circle" style={toggleColor(3)}></div>
      <hr className="bar" style={toggleColor(4)}></hr>
      <div className="circle" style={toggleColor(4)}></div>
    </div>
  );
}

export default Multistepper;
