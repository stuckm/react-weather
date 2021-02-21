import React, { useEffect, useState } from "react";
import { getIcon, createRandomCities } from "./util";
import "./TopCities.css";

const TopCities = ({ changeCity }) => {
  const [cityData, setCityData] = useState([]);
  const cities = createRandomCities();
  const key = "eca311ff23cf5f22c22f3a925f51bd5f";

  useEffect(() => {
    cities.map((city) => {
      const getData = async () => {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
        )
          .then((res) => res.json())
          .then((data) => setCityData((cityData) => [...cityData, data]));
      };
      getData();
    });
  }, []);

  return (
    <div className="city-container">
      <div className="title">
        Popular <br />
        Cities
      </div>
      {cityData.map((city) => {
        return (
          <div className="city" onClick={() => changeCity(city.name)}>
            <div className="city-icon">
              {getIcon(
                city.weather[0].main.toLowerCase(),
                "large",
                city.dt,
                city.timezone
              )}
            </div>
            <div className="city-info">
              <p className="city-info-name">{city.name}</p>
              <div className="city-info-stats">
                <p>
                  {city.weather[0].main}
                  <span className="city-info-stats-temp">
                    {Math.floor(city.main.temp)}&deg; F
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TopCities;
