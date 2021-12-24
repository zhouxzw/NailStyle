import { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import AuthContext from "../context/AuthContext";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  const login = async () => {
    await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      url: "https://nailstyle-server.herokuapp.com/login",
      withCredentials: true,
    }).then((res) => {
      getLoggedIn();
    });
  };

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: "anthony.le",
        password: "#Nailstyle2021",
      },
      withCredentials: true,
      url: "https://nailstyle-server.herokuapp.com/register",
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <div className="admin-login-body">
        <div className="login-card">
          <h2>NailStyle</h2>
          <input
            className="login-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={login}>
            Login
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              register();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
