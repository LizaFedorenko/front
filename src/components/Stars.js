import React from "react";
import "../style.css";

const starsData = [
  { 
    id: 1, 
    name: "Sun", 
    image: "https://en.wikipedia.org/wiki/Sun#/media/File:The_Sun_in_white_light.jpg", 
    description: "The Sun is the star at the center of the Solar System. It is a massive, nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy from its surface mainly as visible light and infrared radiation with 10% at ultraviolet energies." 
  },
  { 
    id: 2, 
    name: "Бетельгейзе", 
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Betelgeuse_star.jpg", 
    description: "Червоний надгігант у сузір’ї Оріона, потенційна наднова." 
  },
  { 
    id: 3, 
    name: "Альфа Центавра", 
    image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Alpha_Centauri.jpg", 
    description: "Найближча зоряна система до Сонця, складається з трьох зірок." 
  },
  {
    id: 4, 
    name: "Альфа Центавра", 
    image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Alpha_Centauri.jpg", 
    description: "Найближча зоряна система до Сонця, складається з трьох зірок." 
  },
  {
    id: 5, 
    name: "Альфа Центавра", 
    image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Alpha_Centauri.jpg", 
    description: "Найближча зоряна система до Сонця, складається з трьох зірок." 
  }
];

const Stars = () => {
  return (
    <div className="stars-box">
      <h1>Nearest stars</h1>
      <div className="stars-grid">
        {starsData.map((star) => (
          <div key={star.id} className="star-card">
            <img src={star.image} alt={star.name} />
            <div className="star-info">
              <h2>{star.name}</h2>
              <p>{star.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stars;
