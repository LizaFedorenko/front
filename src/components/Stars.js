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
    name: "Proxima Centauri", 
    image: "https://en.wikipedia.org/wiki/Proxima_Centauri#/media/File:New_shot_of_Proxima_Centauri,_our_nearest_neighbour.jpg", 
    description: "Proxima Centauri is the nearest star to Earth after the Sun, located 4.25 light-years away in the southern constellation of Centaurus. This object was discovered in 1915 by Robert Innes." 
  },
  { 
    id: 3, 
    name: "Barnard's Star", 
    image: "https://en.wikipedia.org/wiki/Barnard%27s_Star#/media/File:Barnardstar2006.jpg", 
    description: "Barnard's Star is a small red dwarf star in the constellation of Ophiuchus. At a distance of 5.96 light-years (1.83 pc) from Earth, it is the fourth-nearest-known individual star to the Sun after the three components of the Alpha Centauri system, and is the closest star in the northern celestial hemisphere." 
  },
  {
    id: 4, 
    name: "Luhman 16 ", 
    image: "https://en.wikipedia.org/wiki/File:Two_Brown_Dwarfs_in_Our_Backyard.jpg", 
    description: "Luhman 16 (also designated WISE 1049−5319 or WISE J104915.57−531906.1) is a binary brown-dwarf system in the southern constellation Vela at a distance of 6.51 light-years (2.00 parsecs) from the Sun. These are the closest-known brown dwarfs and the closest system found since the measurement of the proper motion of Barnard's Star in 1916,[12][13] and the third-closest-known system to the Sun (after the Alpha Centauri system and Barnard's Star). " 
  },
  {
    id: 5, 
    name: "WISE 0855−0714", 
    image: "https://en.wikipedia.org/wiki/WISE_0855%E2%88%920714#/media/File:WISE_0855-0714_NIRCam_gif.gif", 
    description: "WISE 0855−0714 (full designation WISE J085510.83−071442.5,[6] or W0855 for short) is a sub-brown dwarf of spectral class Y4, located 7.4 light-years (2.3 parsecs) from the Sun in the constellation Hydra. It is the fourth-closest star or (sub-) brown dwarf system to the Sun and was discovered by Kevin Luhman in 2013 using data from the Wide-field Infrared Survey Explorer (WISE)." 
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
