import React from "react";
import { Header, Container } from "semantic-ui-react";
import { addComma } from "./util";
import moment from "moment";

const Headline = ({ cast, data, date, offset }) => {
  const currentDate = moment.unix(date).utc();
  currentDate.add(offset, "s");
  let formatDate = currentDate.format("h:mm a");
  return data.name ? (
    <Container>
      <Header as="h1">{`${data.name}, ${data.country}`}</Header>
      <p>{formatDate}</p>
      <p>Population {addComma(data.population)}</p>
    </Container>
  ) : null;
};

export default Headline;
