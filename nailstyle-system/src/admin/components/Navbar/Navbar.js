import "./Navbar.css";
import { BsFillCalendarFill, BsPeopleFill, BsGraphUp, BsFillPersonLinesFill} from "react-icons/bs";
import { useState } from "react";


function Navbar() {

  
  const [activeLink, setActiveLink] = useState([true,false,false,false]);

  //move these states to parent component
  //state of tab will determine what content is rendered on the right-hand side
  const [bookings, setBookings] = useState(true);
  const [customers, setCustomers] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [employee, setEmployee] = useState(false);

  //https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
  const handleLink = (index) => {
    let toggle = !activeLink[index];
    let activeLinkCopy = activeLink;
    activeLinkCopy[index] = toggle
    setActiveLink(activeLinkCopy)
  }

  //the following style will be applied to links that are click
  const linkStyles = {
    border: "3px rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: "9px",
    boxShadow: "0 0 15px rgba(33,33,33,.4)",
    transition: "0.5 ease" 
  }

  //refactor in the future!
  function trackState(indexPosition){
    let activeCopy = activeLink.map(function(state, i) {
      if(i === indexPosition){
        return true
      } else {
        return false
      }
    })
    if(activeCopy[0] === true){
      console.log("bookings")
      setBookings(true)
      setCustomers(false)
      setAnalytics(false)
      setEmployee(false)
    }
    if(activeCopy[1] === true){
      console.log("customers")
      setBookings(false)
      setCustomers(true)
      setAnalytics(false)
      setEmployee(false)
    }
    if(activeCopy[2] === true){
      setBookings(false)
      setCustomers(false)
      setAnalytics(true)
      setEmployee(false)
    }
    if(activeCopy[3] === true){
      setBookings(false)
      setCustomers(false)
      setAnalytics(false)
      setEmployee(true)
    }
  }

  return (
    <div className="navbar-container">
      <div className="logo">NAIL</div>
      <div className="categories">
        <ul className="links">
          <li>
            <div className="link" style={bookings ? linkStyles : null} onClick={() => trackState(0)}>
                <BsFillCalendarFill className="icon"></BsFillCalendarFill>
                <div>Bookings</div>
            </div>
            <div className="hover-link"></div>
          </li>
          <li>
            <div className="link" style={customers ? linkStyles : null} onClick={() => trackState(1)}>
                <BsPeopleFill className="icon"></BsPeopleFill>
                <div>Customers</div>
            </div>
          </li> 
          <li>
            <div className="link" style={analytics ? linkStyles : null} onClick={() => trackState(2)}>
                <BsGraphUp className="icon"></BsGraphUp>
                <div>Analytics</div>
            </div>
          </li>
          <li>
            <div className="link" style={employee ? linkStyles : null} onClick={() => trackState(3)}>
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
