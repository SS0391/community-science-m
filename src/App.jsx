import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar.jsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Pages imports
import Home from "./pages/HomePage/HomePage.jsx";
import Contact from "./pages/ContactPage/ContactPage.jsx";
import Events from "./pages/Events/EventsPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import News from "./pages/NewsPage/News.jsx";
import Exhibits from "./pages/ExhibitsPage/ExhibitsPage.jsx";
import Guides from "./pages/GuidesPage/Guides.jsx";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <div className="appLayout">
            <NavBar />
            <main className="mainContent">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="exhibits" element={<Exhibits />}></Route>
                <Route path="news" element={<News />}></Route>
                <Route path="events" element={<Events />}></Route>
                <Route path="guides" element={<Guides />}></Route>
                <Route path="contact" element={<Contact />}></Route>
                <Route path="login" element={<Login />}></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
