import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Admin from "../admin/Admin";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(false);

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => setToken(res.data));
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
      <Switch>
        {token ? <Route path="/admin" component={Admin}></Route> : null}
      </Switch>
    </div>
  );
}

export default Auth;
