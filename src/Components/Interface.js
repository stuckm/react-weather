import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";

const Interface = ({ data, cast, setSelect }) => {
  const [item, setItem] = useState("current");

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
          name="current"
          active={item === "current"}
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
          name="daily"
          active={item === "daily"}
          onClick={handleItemClick}
        />
        <Menu.Item
          style={{ color: "#8e9ba3", flex: 1 }}
          name="map"
          active={item === "map"}
          onClick={handleItemClick}
        />
      </Container>
    </Menu>
  );
};

export default Interface;
