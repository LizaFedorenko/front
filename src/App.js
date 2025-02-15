import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import Planets from "./components/Planets";
import Stars from "./components/Stars";
import Moon from "./components/Moon";
import Chat from "./components/Chat";
import About from "./components/About";
import PlanetPage from "./pages/PlanetPage";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="cosmos-back"></div>
      <div className="app-container">
        <header>
          <h1>Solar System Project</h1>
          <nav>
            <Link to="/">Main</Link>
            <Link to="/planets">Planets</Link>
            <Link to="/stars">Stars</Link>
            <Link to="/moon">Moon</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:planetName" element={<PlanetPage />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/moon" element={<Moon />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <div class = "bottom">
          <p>All rights reserved (C)</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
