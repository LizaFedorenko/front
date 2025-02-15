import React from "react";
import "../style.css";
import { useEffect, useState } from "react";

const Main = () => {
  const text = "Welcome!";
  const typingSpeed = 200;
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); 

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1); 
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <h1 className="welcome-text">{displayedText}</h1>;
};


export default Main;
