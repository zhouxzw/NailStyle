import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Switch, useHistory } from "react-router-dom";
//import Protected from "../admin/Protected";

import "./Auth.css";

function Auth(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkAdminState, setCheckAdminState] = useState(false);
  //const [token, setToken] = useState(false);
  const history = useHistory();

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      props.authenticate(res.data);
      if (res.data === true) {
        history.push("/admin");
      } else {
        history.push("/adminlogin");
      }
    });
  };

  /*
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: adminUsername,
        password: adminPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  };
*/

  return (
    <div>
      <div className="admin-login-body">
        <div className="login-card">
          <h2>NailStyle</h2>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
