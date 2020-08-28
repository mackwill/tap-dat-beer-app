import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = (e) => {
    console.log("Open Login modal");
    // Uncomment this when the modal is here:
    setLoginOpen(true);
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
      <h1>TAP DAT BEER APP</h1>
    </div>
  );
}

export default App;
