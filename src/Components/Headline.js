import React from "react";
import { Header, Container, Loader, Dimmer, Segment } from "semantic-ui-react";
import { addComma } from "./util";

const Headline = ({ cast, data }) => {
  return data.name ? (
    <Container>
      <Header as="h1">{`${data.name}, ${data.country}`}</Header>
      <p>Population {addComma(data.population)}</p>
    </Container>
  ) : (
    <Dimmer active inverted>
      <Loader size="massive" />
    </Dimmer>
  );
};

export default Headline;