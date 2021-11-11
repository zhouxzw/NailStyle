import { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import AuthContext from "../context/AuthContext";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      url: "http://localhost:4000/login",
      withCredentials: true,
    }).then((res) => {
      getLoggedIn();
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

export default Login;
