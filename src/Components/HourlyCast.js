import React from "react";
import { Table, Container } from "semantic-ui-react";
import { getIcon, createDate } from "./util";

const HourlyCast = ({ cast, offset }) => {
  const trimmedList = cast.slice(0, 13);

  const renderedList = trimmedList.map((item) => {
    return (
      <Table.Row>
        <Table.Cell collapsing>
          {createDate(item.dt, "h:mm a", offset)}
        </Table.Cell>
        <Table.Cell textAlign="center">
          {getIcon(item.weather[0].main.toLowerCase(), "big", item.dt, offset)}
        </Table.Cell>
        <Table.Cell>{item.weather[0].main}</Table.Cell>
        <Table.Cell>{`${Math.floor(item.temp)} \xB0 F`}</Table.Cell>
        <Table.Cell>{`${Math.floor(item.feels_like)} \xB0 F`}</Table.Cell>

        <Table.Cell>{`${item.wind_speed} MPH`}</Table.Cell>
      </Table.Row>
    );
  });
  return (
    <Container>
      <Table striped unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" colSpan="2">
              Conditions
            </Table.HeaderCell>
            <Table.HeaderCell>Temp</Table.HeaderCell>
            <Table.HeaderCell>Feels Like</Table.HeaderCell>
            <Table.HeaderCell>Wind</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{renderedList}</Table.Body>
      </Table>
    </Container>
  );
};

export default HourlyCast;
