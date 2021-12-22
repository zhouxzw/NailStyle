import axios from "axios";
import React, { useState } from "react";

import "./Popup.css";

function Popup(props) {
  const today = new Date().toLocaleDateString();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [confirm, setConfirm] = useState();

  async function endDate() {
    const request = await axios.post("/endday");
    console.log(request);
  }

  return (
    <div className="popup-container">
      <h2 className="date-title">Date Change</h2>
      <div className="date-box">
        <h3>Today: {today} </h3>
        <h3>Tomorrow: {tomorrow.toLocaleDateString()}</h3>
      </div>
      <div className="popup-confirm-container">
        <label>CONFIRM (YES)</label>
        <input
          className="confirm-input"
          maxLength="3"
          type="text"
          onChange={(event) => setConfirm(event.target.value.toUpperCase())}
        ></input>
      </div>
      <div className="popup-buttons">
        <button
          onClick={() => {
            if (confirm === "YES") {
              endDate();
            }
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            props.cancel(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Popup;
