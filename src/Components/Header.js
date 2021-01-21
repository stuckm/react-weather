import React from "react";

import { Menu, Input, Icon, Button, Form } from "semantic-ui-react";

const Header = ({ getWeather, data }) => {
  return (
    <Menu
      style={{
        backgroundColor: "#a5b5bf",
        display: "flex",
        alignItems: "baseline",
        marginBottom: 0,
      }}
    >
      <h1 style={{ color: "white", marginLeft: "20px" }}>Weather Data</h1>

      <Menu.Menu position="right">
        <div style={{ color: "white", margin: "20px", textAlign: "center" }}>
          <Icon name="location arrow inverted"></Icon>
          {data.name}
        </div>
        <Menu.Item position="right">
          <Form onSubmit={getWeather}>
            <Form.Field>
              <input
                name="city"
                type="text"
                style={{
                  width: "80%",
                  borderRadius: "20px",
                  marginRight: "3px",
                }}
              ></input>
              <Button type="submit" circular icon="search"></Button>
            </Form.Field>
          </Form>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
