import "./Navbar.css";
import { BsFillCalendarFill, BsPeopleFill, BsGraphUp, BsFillPersonLinesFill} from "react-icons/bs";


function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo">NAIL</div>
      <div className="categories">
        <ul className="links">
          <li>
            <div className="link">
                <BsFillCalendarFill className="icon"></BsFillCalendarFill>
                <div>Bookings</div>
            </div>
          </li>
          <li>
            <div className="link">
                <BsPeopleFill className="icon"></BsPeopleFill>
                <div>Customers</div>
            </div>
          </li>
          <li>
            <div className="link">
                <BsGraphUp className="icon"></BsGraphUp>
                <div>Analytics</div>
            </div>
          </li>
          <li>
            <div className="link">
                <BsFillPersonLinesFill className="icon"></BsFillPersonLinesFill>
                <div>Employee</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
