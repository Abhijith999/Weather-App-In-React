import React, { useState } from "react";
import "./Weather.css";
function Weather() {
  let [location, setLocation] = useState("");
  let [loading, setLoading] = useState(false);
  let [Data, setData] = useState(null);
  let [error, setError] = useState("");

  let findCityWeather = () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=df8805b218019cc28ee719f8c0d9667e`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.message) {
          setError(response.message);
          setData(null);
        } else {
          setError("");
          setData(response);
        }
        console.log(response);
      });
  };
  if (loading) {
    return <h1>Loading.......</h1>;
  }
  return (
    <div className="container">
      <input
        placeholder="Enter Location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        onClick={(e) => {
          e.target.value = "";
        }}
      />
      <button
        onClick={() => {
          findCityWeather();
        }}
      >
        Search
      </button>
      {Data ? (
        <>
          <h1 style={{ textDecoration: "underline", fontFamily: "sans-serif" }}>
            Current Weather
          </h1>
          <div
            className="display"
            style={{
              background:
                Data.main.temp > 300.15
                  ? `linear-gradient(to bottom, #ffcc00 0%, #ff3300 100%)`
                  : `linear-gradient(to bottom, #66ffcc 0%, #00ccff 100%)`
            }}
          >
            <div>Temperature: {(Data.main.temp - 273.15).toFixed(2)} °C</div>
            <div>Pressure: {Data.main.pressure} Bar</div>
            <div>{Data.weather[0].description}</div>
          </div>
        </>
      ) : (
        <h2 style={{ color: "red", fontFamily: "sans-serif" }}>{error}</h2>
      )}
    </div>
  );
}
export default Weather;
