import "./Employee.css";
import { BsSearch, BsPlus } from "react-icons/bs";

const Employee = () => {
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
        <div className="employee-column-title">
          <span>NAME</span>
          <span>EMAIL</span>
          <span>PHONE</span>
          <span>DATE OF HIRE</span>
        </div>
        <div className="put the check boxes here?"></div>
        <div className="put the map function here">
          <hr className="line-employee"></hr>
        </div>
      </div>
    </div>
  );
};

export default Employee;
