import React from "react";
import moment from "moment";
import { Card, Statistic } from "semantic-ui-react";

const Hourly = ({ data, cast }) => {
  const renderedList = cast.map((day) => {
    let time = moment.unix(day.dt);
    time = time.format("ddd, hA");
    return (
      <Card>
        <Card.Content header={time} />
        <Card.Content description={`${Math.floor(day.main.temp)} \xB0 F`} />
        <Card.Content>
          <Statistic>
            <Statistic.Value>{`${Math.floor(day.main.temp)} `}</Statistic.Value>
            <Statistic.Label>{`\xB0 F`}</Statistic.Label>
          </Statistic>
        </Card.Content>
        <Card.Content description={day.weather[0].main} />
      </Card>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      {renderedList}
    </div>
  );
};

export default Hourly;
