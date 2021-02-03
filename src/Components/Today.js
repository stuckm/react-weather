import React from "react";
import { Container, Icon } from "semantic-ui-react";
import "./Today.css";
import moment from "moment";
import { getIcon, createDate, createDescrip, checkDir } from "./util";
import Map from "./Map";

const Today = ({ cast, data, daily, hourly, offset, date }) => {
  const currentDate = moment.unix(date).utc();
  currentDate.add(offset, "s");
  const formatDate = currentDate.format("H");
  let cast1, cast2, cast3, cast4;

  console.log(hourly);

  if (formatDate > 5) {
    cast1 = hourly[0];
    cast2 = hourly[11];
    cast3 = hourly[24];
    cast4 = hourly[36];
  } else {
    cast1 = hourly[12];
    cast2 = hourly[20];
    cast3 = hourly[30];
    cast4 = hourly[38];
  }

  const cast4Date = moment.unix(cast4.dt).utc();
  cast4Date.add(offset, "s");
  const cast4matted = cast4Date.format("dddd");

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
                  "massive",
                  cast.dt
                )}
              </div>
              <div className="wind-stats">{cast.weather[0].description}</div>
            </div>

            <div className="today-info-wind">
              <Icon size="massive" color="grey" name="compass outline" />
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
                cast1.weather[0].main.toLowerCase(),
                "huge",
                cast1.dt,
                offset
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">
                {formatDate > 15 ? "Tonight" : "Today"}
              </h4>
              <p className="today-boxes-date">
                {createDate(cast1.dt, "ddd MM/DD", offset)}
              </p>
              <p>
                {" "}
                {formatDate > 15 ? "Low" : "High"} {Math.floor(cast1.temp)}&deg;
                F{" "}
              </p>
              <p>
                <Icon name="tint" color="blue" /> {cast1.pop} %
              </p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(cast1)}</div>
        </div>
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                cast2.weather[0].main.toLowerCase(),
                "huge",
                cast2.dt,
                offset
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">
                {formatDate > 15 ? "Tommorow" : "Tonight"}
              </h4>
              <p className="today-boxes-date">
                {createDate(cast2.dt, "ddd MM/DD", offset)}
              </p>
              <p>
                {formatDate > 15 ? "High" : "Low"} {Math.floor(cast2.temp)}&deg;
                F
              </p>
              <p>
                <Icon name="tint" color="blue" /> {cast2.pop} %
              </p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(cast2)}</div>
        </div>
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                cast3.weather[0].main.toLowerCase(),
                "huge",
                cast3.dt,
                offset
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">
                {formatDate > 15 ? "Tommorow Night" : "Tommorow"}
              </h4>
              <p className="today-boxes-date">
                {createDate(cast3.dt, "ddd MM/DD", offset)}
              </p>
              <p>
                {formatDate > 15 ? "Low" : "High"} {Math.floor(cast3.temp)}&deg;
                F
              </p>
              <p>
                <Icon name="tint" color="blue" /> {cast3.pop} %
              </p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(cast3)}</div>
        </div>
        <div className="today-boxes">
          <div className="today-boxes-header">
            <div className="today-boxes-icon">
              {getIcon(
                cast4.weather[0].main.toLowerCase(),
                "huge",
                cast4.dt,
                offset
              )}
            </div>
            <div className="today-boxes-stats">
              <h4 className="today-boxes-stats-title">
                {formatDate > 15 ? cast4matted : "Tommorow Night"}
              </h4>
              <p className="today-boxes-date">
                {createDate(cast4.dt, "ddd MM/DD", offset)}
              </p>
              <p>
                {formatDate > 15 ? "High" : "Low"} {Math.floor(cast4.temp)}&deg;
                F
              </p>
              <p>
                <Icon name="tint" color="blue" /> {cast4.pop} %
              </p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(cast4)}</div>
        </div>
      </div>
    </Container>
  ) : null;
};
export default Today;
