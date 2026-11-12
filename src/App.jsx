import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar.jsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <div className="appLayout">
            <NavBar />
            <main className="mainContent">{/* Her kommer <Routes> og sidene dine */}</main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
