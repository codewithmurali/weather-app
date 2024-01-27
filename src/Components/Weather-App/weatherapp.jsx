import React, { useEffect, useState } from "react";
import "./weatherapp.css";
import SkeletonElement from "../Skeleton/SkeletonElement";

import clear_icon from "../../assets/clear.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import search_icon from "../../assets/search.png";
import humidity_icon from "../../assets/humidity.png";
import cloud_icon from "../../assets/cloud.png";

const Weatherapp = () => {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [imageData, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return clear_icon;
      case "Drizzle":
        return drizzle_icon;
      case "Rain":
        return rain_icon;
      case "Snow":
        return snow_icon;
      default:
        return cloud_icon;
    }
  };

  let api_key = "5c42912eb09eee021741318771ad32a1";

  const search = async () => {
    if (inputValue === "") {
      return null;
    }
    try {
      setError(null);
      setIsLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let data = await response.json();
      const weatherIcon = getWeatherIcon(data.weather[0].main);
      setImage(weatherIcon);
      setWeatherData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter the City name"
          onChange={handleInput}
        ></input>
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      {error ? (
        <p className="error">{error}</p>
      ) : isLoading ? (
        <SkeletonElement theme="dark"></SkeletonElement>
      ) : (
        weatherData && (
          <div>
            <div className="weather-data">
              <div className="weather-image">
                <img src={imageData} alt="" width="150px" />
              </div>
              <div className="temp-details">
                <div className="weather-temp">{`${weatherData.main.temp}`}</div>
                <div className="weather-location">{`${weatherData.name}`}</div>
              </div>
            </div>
            <div className="data-container">
              <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                  <div className="humidity-percent">{`${weatherData.main.humidity} %`}</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={wind_icon} alt="" icon />
                <div className="data">
                  <div className="wind-rate">{`${weatherData.wind.speed} km/h`}</div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weatherapp;
