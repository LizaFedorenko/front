import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style.css";

import mercuryImg from "../assets/Mercury.jpg";
import venusImg from "../assets/venus.jpg";
import earthImg from "../assets/earth.jpg";
import marsImg from "../assets/mars.jpg";
import jupiterImg from "../assets/jupiter.jpg";
import saturnImg from "../assets/saturn.jpg";
import uranusImg from "../assets/uranus.jpg";
import neptuneImg from "../assets/neptune.jpg";
import plutoImg from "../assets/pluto.jpg";

const planetInfo = {
    mercury: { desc: "Mercury is the smallest planet.", img: mercuryImg },
    venus: { desc: "Venus has a thick atmosphere.", img: venusImg },
    earth: { desc: "Earth supports life.", img: earthImg },
    mars: { desc: "Mars is the Red Planet.", img: marsImg },
    jupiter: { desc: "Jupiter is the biggest planet.", img: jupiterImg },
    saturn: { desc: "Saturn has beautiful rings.", img: saturnImg },
    uranus: { desc: "Uranus rotates on its side.", img: uranusImg },
    neptune: { desc: "Neptune is farthest from the Sun.", img: neptuneImg },
    pluto: { desc: "Pluto is a dwarf planet.", img: plutoImg },
  };
  
  const PlanetPage = () => {
    const { planetName } = useParams();
    const navigate = useNavigate();
  
    if (!planetName || !planetInfo[planetName]) {
      return <h2>Error: something has gone wrong</h2>;
    }
  
    const planet = planetInfo[planetName];
  
    return (
      <div className="planet-container">
        <div className="planet-name">{planetName.charAt(0).toUpperCase() + planetName.slice(1)}</div>
        <div className="planet-content">
          <img src={planet.img} alt={planetName} className="planet-image" />
          <p className="planet-description">{planet.desc}</p>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>back</button>
      </div>
    );
  };
  
  export default PlanetPage;
