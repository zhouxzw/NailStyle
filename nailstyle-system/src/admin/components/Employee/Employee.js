import "./Employee.css";
import { BsSearch, BsPlus } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Customer from "../Customer/Customer";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    async function retrieveEmployees() {
      const response = await axios.get("/employees");
      const modData = response.data;

      modData.map((employee) => {
        // date format is ###-###-####
        let phone = employee.phone;
        phone = [phone.slice(0, 3), "-", phone.slice(3)].join("");
        phone = [phone.slice(0, 7), "-", phone.slice(7)].join("");
        employee.phone = phone;

        // date format is mm/dd/yyyy
        let dateofhire = employee.dateofhire;
        dateofhire = [dateofhire.slice(0, 2), "-", dateofhire.slice(2)].join(
          ""
        );
        dateofhire = [dateofhire.slice(0, 5), "-", dateofhire.slice(5)].join(
          ""
        );
        employee.dateofhire = dateofhire;
        employee.toggle = false;
      });

      setEmployees(response.data);
    }

    retrieveEmployees();
  });

  function toggleCard(employee) {
    let copy = employees;
    console.log(employee);

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] === employee) {
        !employee.toggle;
      }
    }
  }

  return (
    <div className="employee-container">
      <input className="filter-bar" placeholder="Filter..." type="text"></input>
      <div className="employee-header-container">
        <h1>List of Employees</h1>
        <button className="employee-add-btn">
          <BsPlus className="add-icon"></BsPlus>
          <span>New Employee</span>
        </button>
      </div>
      <div className="employee-list-container">
        <div className="employee-column-title column-layout">
          <input type="checkbox" />
          <span>NAME</span>
          <span>EMAIL</span>
          <span>PHONE</span>
          <span>DATE OF HIRE</span>
        </div>

        {employees.map((employee, i) => (
          <div>
            <hr className="line-employee"></hr>
            <div className="employee-card">
              <ul className="column-layout">
                <input type="checkbox" />
                <li>{employee.name}</li>
                <li>{employee.email}</li>
                <li>{employee.phone}</li>
                <li>{employee.dateofhire}</li>
                <MdArrowDropDown
                  className="employee-dropdown"
                  onClick={() => toggleCard(employee)}
                ></MdArrowDropDown>
              </ul>
            </div>
            {employee.toggle ? (
              <div>
                <button className="employee-delete-button">TESTER</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
