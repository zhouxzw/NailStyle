import "./Navbar.css";
import { BsFillCalendarFill, BsPeopleFill, BsGraphUp, BsFillPersonLinesFill} from "react-icons/bs";


function Navbar() {

  const linkStyles = {
    border: "3px solid rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: "9px",
  }

  return (
    <div className="navbar-container">
      <div className="logo">NAIL</div>
      <div className="categories">
        <ul className="links">
          <li>
            <div className="link" style={linkStyles}>
                <BsFillCalendarFill className="icon"></BsFillCalendarFill>
                <div>Bookings</div>
            </div>
            <div className="hover-link"></div>
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
