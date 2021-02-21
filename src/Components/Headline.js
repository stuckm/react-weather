import React from "react";
import { Header, Container } from "semantic-ui-react";
import { addComma } from "./util";
import moment from "moment";

const Headline = ({ data, date, offset, location }) => {
  const currentDate = moment.unix(date).utc();
  currentDate.add(offset, "s");
  let formatDate = currentDate.format("h:mm a");
  return location.name ? (
    <Container>
      <Header as="h1">{`${location.name}, ${location.region}`}</Header>
      <Header style={{ marginTop: 0 }} as="h4">{`${location.country}`}</Header>
      <p>{formatDate}</p>
      <p>Population {addComma(data.population)}</p>
    </Container>
  ) : null;
};

export default Headline;
