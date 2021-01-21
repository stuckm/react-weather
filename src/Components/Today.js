import React from "react";
import { Container, Icon } from "semantic-ui-react";
import "./Today.css";
import moment from "moment";
import { windDir, getIcon, createDate } from "./util";
import Map from "./Map";

const Today = ({ cast, data, daily }) => {
  const deg = cast.wind_deg;
  const checkDir =
    deg > 348.75 || deg < 11.25 ? (
      <div className="wind-stats">N</div>
    ) : (
      windDir.map((item) => {
        if (deg >= item.value[0] && deg <= item.value[1]) {
          return <div className="wind-stats">{item.name}</div>;
        }
      })
    );

  return cast.weather && daily[0] ? (
    <Container>
      <div className="testing">
        <Icon size="small" name="clock outline" />
        retrieved at {moment().format("MMMM Do YYYY, h:mm:ss a")}
      </div>
      <div className="container-today">
        <div className="today-info">
          <div
            className="circle"
            style={{
              border: `6px solid ${
                Math.floor(cast.temp) > 59 ? "orange" : "blue"
              }`,
            }}
          >
            <h1
              className="temp"
              style={{
                color: Math.floor(cast.temp) > 59 ? "orange" : "blue",
              }}
            >
              {`${Math.floor(cast.temp)} `}
              <span className="degree">&deg; F</span>
            </h1>
          </div>
          <div className="today-info-icons">
            <div className="today-info-cast">
              <div>
                {getIcon(
                  cast.weather[0].description.toLowerCase(),
                  "huge",
                  cast.dt
                )}
              </div>
              <div className="wind-stats">{cast.weather[0].main}</div>
            </div>

            <div className="today-info-wind">
              <Icon size="huge" color="grey" name="compass outline" />
              <div className="wind-stats">
                {Math.round(cast.wind_speed)} MPH
              </div>
              <div className="wind-stats">{checkDir}</div>
            </div>
          </div>
        </div>
        <div className="map-me">
          <Map coords={[data.coord.lat, data.coord.lon]} />
        </div>
      </div>

      <div className="today-boxes-container">
        <div className="today-boxes">
          <div className="today-boxes-icon">
            {getIcon(
              daily[0].weather[0].main.toLowerCase(),
              "huge",
              daily[0].dt
            )}
          </div>
          <div className="today-boxes-stats">
            <p>Tonight</p>
            <p>{createDate(daily[1].dt, "ddd MM/DD")}</p>
            <p>Low {daily[0].temp.min}</p>
          </div>
        </div>
        <div className="today-boxes">
          <h4>Tommorow</h4>
          {createDate(daily[1].dt, "ddd MM/DD")}
          <p>High {daily[1].temp.max}</p>
        </div>
        <div className="today-boxes">
          <h4>Tommorow Night</h4>
          {createDate(daily[1].dt, "ddd MM/DD")}
          <p>Low {daily[1].temp.min}</p>
        </div>
        <div className="today-boxes">4</div>
      </div>
    </Container>
  ) : null;
};
export default Today;