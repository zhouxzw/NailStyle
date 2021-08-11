import "./Navbar.css";
import { BsFillCalendarFill, BsPeopleFill, BsGraphUp, BsFillPersonLinesFill} from "react-icons/bs";

const Navbar = (props) => {
  
  //const [activeLink, setActiveLink] = useState([true,false,false,false]);

  //move these states to parent component
  //state of tab will determine what content is rendered on the right-hand side
  //const [bookings, setBookings] = useState(true);
  //const [customers, setCustomers] = useState(false);
  //const [analytics, setAnalytics] = useState(false);
  //const [employee, setEmployee] = useState(false);

  //https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks
  const handleLink = (index) => {
    let toggle = !props.tabState[index];
    let tabStateCopy = props.tabState;
    tabStateCopy[index] = toggle
    props.setTabState(tabStateCopy)
  }

  //the following style will be applied to links that are click
  const linkStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "9px",
    boxShadow: "0 0 15px rgba(33,33,33,.4)",
    transition: "1s ease" 
  }

  //refactor in the future!
  function trackState(indexPosition){
    let activeCopy = (props.links).map(function(state, i) {
      if(i === indexPosition){
        return true
      } else {
        return false
      }
    })

    if(activeCopy[0] === true){
      props.actBooking(true)
      props.actCustomer(false)
      props.actAnalytic(false)
      props.actEmployee(false)
    }
    if(activeCopy[1] === true){
      props.actBooking(false)
      props.actCustomer(true)
      props.actAnalytic(false)
      props.actEmployee(false)
    }
    if(activeCopy[2] === true){
      props.actBooking(false)
      props.actCustomer(false)
      props.actAnalytic(true)
      props.actEmployee(false)
    }
    if(activeCopy[3] === true){
      props.actBooking(false)
      props.actCustomer(false)
      props.actAnalytic(false)
      props.actEmployee(true)
    }
  }

  return (
    <div className="navbar-container">
      <div className="logo">NAIL</div>
      <div className="categories">
        <ul className="links">
          <li>
            <div className="link" style={props.checkState.bookings ? linkStyles : null} onClick={() => trackState(0)}>
                <BsFillCalendarFill className="icon"></BsFillCalendarFill>
                <div>Bookings</div>
            </div>
            <div className="hover-link"></div>
          </li>
          <li>
            <div className="link" style={props.checkState.customers ? linkStyles : null} onClick={() => trackState(1)}>
                <BsPeopleFill className="icon"></BsPeopleFill>
                <div>Customers</div>
            </div>
          </li> 
          <li>
            <div className="link" style={props.checkState.analytics ? linkStyles : null} onClick={() => trackState(2)}>
                <BsGraphUp className="icon"></BsGraphUp>
                <div>Analytics</div>
            </div>
          </li>
          <li>
            <div className="link" style={props.checkState.employee ? linkStyles : null} onClick={() => trackState(3)}>
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
