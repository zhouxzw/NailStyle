import React from "react";
import ReactDOM from "react-dom";
import NailStyle from "./nailstyle/NailStyle";
import { AuthContextProvider } from "../src/context/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <NailStyle></NailStyle>
  </AuthContextProvider>,
  document.getElementById("root")
);
