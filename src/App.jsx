import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar.jsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
