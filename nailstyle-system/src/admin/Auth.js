import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Switch,
  Redirect,
  Route,
  useHistory,
} from "react-router-dom";
import Protected from "../admin/Protected";

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
      <div>
        <h1>Username</h1>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
      {/*
            <Switch>
        <Protected path= auth={token}></Protected>
      </Switch>
      */}
    </div>
  );
}

export default Auth;
