import React, { useState } from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import axios from "axios";

import "./App.css";

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [state, setState] = useState({
    username: null,
    password: null,
    currentUser: null,
  });

  const handleLoginOpen = (e) => {
    console.log("Open Login modal");
    setLoginOpen(true);
  };

  const handleLoginChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    return axios
      .post("/api/login", {
        username: state.username,
        password: state.password,
      })
      .then((data) => {
        console.log("login promise data:  ", data);

        // Need the server to return the user object after logging in
        // and set the currentUser to the returned object
        // setState(prev => ({
        //   ...prev,
        //   currentUser: data.data
        // }))
      })
      .catch((err) => {
        console.log("Login Error: ", err);
      });
  };

  const handleRegisterOpen = (e) => {
    console.log("Open Register modal");
    // Uncomment this when the modal is here:
    setRegisterOpen(true);
  };

  return (
    <div className="App">
      <Navbar
        handleRegisterOpen={handleRegisterOpen}
        handleLoginOpen={handleLoginOpen}
      />
      <Login
        open={loginOpen}
        onChange={handleLoginChange}
        handleClose={() => setLoginOpen(false)}
      />
      <h1>TAP DAT BEER APP</h1>
    </div>
  );
}

export default App;
