import React from "react";
import { Container, Icon } from "semantic-ui-react";
import "./Today.css";
import moment from "moment";
import { getIcon, createDate, createDescrip, checkDir } from "./util";
import Map from "./Map";
import Bar from "./Bar";

const Today = ({ cast, data, daily }) => {
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
                Math.floor(cast.temp) > 59 ? "#FDB813" : "#62C2CC"
              }`
            }}
          >
            <h1
              className="temp"
              style={{
                color: Math.floor(cast.temp) > 59 ? "#FDB813" : "#62C2CC"
              }}
            >
              {`${Math.floor(cast.temp)} `}
              <span className="degree">&deg; F</span>
            </h1>
            <p className="feels-like">
              Like {`${Math.floor(cast.feels_like)} `} &deg;
            </p>
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
              <div className="wind-stats">{checkDir(cast.wind_deg)}</div>
            </div>
          </div>
        </div>
        <div className="map-me">
          <Map coords={[data.coord.lat, data.coord.lon]} />
        </div>
      </div>

      <div className="today-boxes-container">
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                daily[0].weather[0].main.toLowerCase(),
                "huge",
                daily[0].dt
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">Tonight</h4>
              <p className="today-boxes-date">
                {createDate(daily[0].dt, "ddd MM/DD")}
              </p>
              <p>Low {Math.floor(daily[0].temp.min)}&deg; F</p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(daily[0])}</div>
        </div>
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                daily[1].weather[0].main.toLowerCase(),
                "huge",
                daily[1].dt
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">Tommorow</h4>
              <p className="today-boxes-date">
                {createDate(daily[1].dt, "ddd MM/DD")}
              </p>
              <p>Low {Math.floor(daily[1].temp.min)}&deg; F</p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(daily[1])}</div>
        </div>
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                daily[1].weather[0].main.toLowerCase(),
                "huge",
                daily[1].dt
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">Tommorow Night</h4>
              <p className="today-boxes-date">
                {createDate(daily[1].dt, "ddd MM/DD")}
              </p>
              <p>Low {Math.floor(daily[1].temp.min)}&deg; F</p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(daily[1])}</div>
        </div>
        <div className="today-boxes">Coming Soon</div>
      </div>
    </Container>
  ) : null;
};
export default Today;
