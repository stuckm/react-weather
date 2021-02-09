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

  if (formatDate < 15) {
    cast1 = hourly[15 - formatDate];
    cast2 = hourly[23 - formatDate];
    cast3 = hourly[39 - formatDate];
    cast4 = hourly[47 - formatDate];
  } else {
    cast1 = hourly[23 - formatDate];
    cast2 = hourly[39 - formatDate];
    cast3 = hourly[47 - formatDate];
    cast4 = hourly[62 - formatDate];
  }
  console.log(15 - formatDate);

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
              <div className="today-info-cast-mobile">
                {getIcon(
                  cast.weather[0].description.toLowerCase(),
                  "massive",
                  cast.dt
                )}
              </div>
              <div className="today-info-cast-desktop">
                {getIcon(
                  cast.weather[0].description.toLowerCase(),
                  "huge",
                  cast.dt
                )}
              </div>

              <div className="wind-stats">{cast.weather[0].description}</div>
            </div>

            <div className="today-info-wind">
              <div className="today-info-wind-mobile">
                <Icon size="massive" color="grey" name="compass outline" />
              </div>
              <div className="today-info-wind-desktop">
                <Icon size="huge" color="grey" name="compass outline" />
              </div>
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
                {formatDate > 15 ? "Low" : "High"} {Math.floor(cast1.temp)}&deg;
                F
              </p>
              <p>
                <Icon name="tint" color="blue" /> {Math.round(cast1.pop * 100)}{" "}
                %
              </p>
            </div>
          </div>
          <div className="today-boxes-summary">{createDescrip(cast3)}</div>
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
                {formatDate > 15 ? "Tomorrow" : "Tonight"}
              </h4>
              <p className="today-boxes-date">
                {createDate(cast2.dt, "ddd MM/DD", offset)}
              </p>
              <p>
                {formatDate > 15 ? "High" : "Low"} {Math.floor(cast2.temp)}&deg;
                F
              </p>
              <p>
                <Icon name="tint" color="blue" /> {Math.round(cast2.pop * 100)}{" "}
                %
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
                <Icon name="tint" color="blue" /> {Math.round(cast3.pop * 100)}{" "}
                %
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
                <Icon name="tint" color="blue" /> {Math.round(cast4.pop * 100)}{" "}
                %
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
