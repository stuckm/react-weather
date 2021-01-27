import React from "react";
import "./Header.css";

import { Menu, Icon, Button, Form } from "semantic-ui-react";

const Header = ({ getWeather, data }) => {
  return (
    <Menu className="header-menu">
      <h1 className="header-menu-logo">Weather Data</h1>

      <Menu.Menu position="right">
        <div className="header-menu-location">
          <Icon name="location arrow inverted"></Icon>
          {data.name}
        </div>
        <Menu.Item position="right">
          <Form onSubmit={getWeather}>
            <Form.Field>
              <input
                className="header-menu-search"
                name="city"
                type="text"
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
