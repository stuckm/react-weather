import React from "react";
import { getIcon, createDate } from "./util";
import { Container, Icon } from "semantic-ui-react";
import "./TenDay.css";
import LineGraph from "./LineGraph";

const TenDay = ({ cast, data }) => {
  const renderedList = cast.map((item) => {
    return (
      <div className="card">
        <div className="card-header">
          <p className="card-date">{createDate(item.dt, "ddd M/D")} </p>
        </div>
        <div className="card-body">
          <div className="card-temps">
            <span className="card-temps-max">
              {`${Math.floor(item.temp.max)} \xB0 F`}
            </span>
            <span className="hidden"> | </span>
            <span className="card-temps-min">
              {`${Math.floor(item.temp.min)} \xB0 F`}
            </span>
          </div>
          <div className="card-icon">
            <div>{getIcon(item.weather[0].main.toLowerCase(), "big")}</div>
            {item.weather[0].main}
          </div>
          <div className="card-precip">
            {" "}
            <Icon name="tint" color="blue" />{" "}
            {item.rain ? Math.round((item.rain / 25.4) * 10) / 10 : 0} in
          </div>
        </div>
      </div>
    );
  });

  return (
    <Container>
      <div className="ten-day-container">{renderedList}</div>
      <LineGraph cast={cast} cityInfo={data} />
    </Container>
  );
};

export default TenDay;
