import React from "react";
import "./Confirm.css";

function Confirm() {
  return (
    <div className="confirm-container">
      <h3>Confirm Appointment</h3>
      <div className="apt-details-container">
        {/* Put the apt deets (props shit) in here */}
        REGULAR MANICURE
      </div>
      <hr />
      <div className="customer-details-container">
        {/* Put the user deets (props shit) in here */}
        JOHN DOE
      </div>
    </div>
  );
}

export default Confirm;
