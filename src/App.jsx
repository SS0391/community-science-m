import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
