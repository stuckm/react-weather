import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";

const Interface = ({ data, cast, setSelect }) => {
  const [item, setItem] = useState("today");

  const handleItemClick = (e, { name }) => {
    setItem(name);
    setSelect(name);
  };

  return (
    <Menu tabular>
      <Container
        style={{
          display: "flex",
          width: "600px",
          justifyContent: "flex-start"
        }}
      >
        <Menu.Item
          style={{ color: "#8e9ba3", flex: 1 }}
          name="today"
          active={item === "today"}
          onClick={handleItemClick}
        />
        <Menu.Item
          style={{ color: "#8e9ba3", flex: 1 }}
          name="hourly"
          active={item === "hourly"}
          onClick={handleItemClick}
        />
        <Menu.Item
          style={{ color: "#8e9ba3", flex: 1 }}
          name="ten day"
          active={item === "ten day"}
          onClick={handleItemClick}
        />
      </Container>
    </Menu>
  );
};

export default Interface;
