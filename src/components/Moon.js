import { useEffect, useState } from "react";
import axios from "axios";

const MoonPhase = () => {
  const [moonData, setMoonData] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/moonphase?startdate=${date}`)
      .then((response) => {
        if (response.data) {
          console.log("Moon phase data:", response.data);
          setMoonData(response.data[0]); 
          
        } else {
          console.log("No data received");
        }
      })
      .catch((error) => {
        console.error("Error fetching moon phase:", error.response?.data || error.message);
      });
  }, [date]);
  
  useEffect(() => {
    if (moonData) {
      console.log("Moon Data Updated:", moonData);
      console.log("Illumination:", moonData.illumination);
    }
  }, [moonData]);
  

  return (
    <div className="moon">
      <div>
        <h2>Choose a date:</h2>
        <div class = "phases">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <h1>Moon Phase for {date}</h1>
        {moonData ? (
        <div>
          <p><strong>Phase:</strong> {moonData.data}</p>
          <p><strong>Illumination:</strong> {moonData.illumination}</p>
          <p><strong>Moon Age:</strong> {moonData.moon_age}</p>
          <p><strong>Moon Sign:</strong> {moonData.moon_sign}</p>
          <p><strong>Moon Zodiac:</strong> {moonData.moon_zodiac}</p>
          <p><strong>Moon Distance:</strong> {moonData.moon_distance}</p>
          <p><strong>Sun Distance:</strong> {moonData.sun_distance}</p>
          <img src={moonData.moon_image} alt="Moon Phase" />
        </div>
        ) : (
          <p>Loading...</p>
       )}
        </div>
      </div>
    </div>
  );
};

export default MoonPhase;
