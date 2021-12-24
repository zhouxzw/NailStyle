import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";
import { BsX } from "react-icons/bs";

function Popup(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const newDate = new Date();
  var currentDate =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate();

  const addNewEmployee = async () => {
    await axios({
      method: "POST",
      data: {
        name: name,
        email: email,
        phone: phone,
        dateofhire: currentDate,
      },
      url: "https://nailstyle-server.herokuapp.com/employees",
      withCredentials: true,
    }).then((res) => {});
  };

  function closePopup() {
    props.getState((prevState) => {
      prevState = !prevState;
    });
  }

  return (
    <div className="popup-shade">
      <div className="popup-parent-container">
        <div className="popup-fields">
          <div className="popup-header-container">
            <h2>Add New Employee</h2>
            <BsX
              className="popup-exit"
              alt="Close"
              onClick={() => closePopup()}
            ></BsX>
          </div>

          <div className="popup-name employee-field">
            <h4>Name</h4>
            <input
              className="popup-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="popup-email employee-field">
            <h4>Email</h4>
            <input
              className="popup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="popup-phone employee-field">
            <h4>Phone</h4>
            <input
              className="popup-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="popup-dateofhire">
            Current Date (of Hire): <span>{currentDate}</span>
          </div>
          <button
            className="popup-add-button"
            onClick={() => {
              if (
                name !== undefined &&
                email !== undefined &&
                phone !== undefined
              ) {
                addNewEmployee();
                closePopup();
              } else {
                window.alert("Enter information");
              }
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
