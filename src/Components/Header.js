import React from "react";
import "./Header.css";

import { Button, Form } from "semantic-ui-react";

const Header = ({ getWeather, data }) => {
  return (
    <>
      <div className="header-menu">
        <h1 className="header-menu-logo">Weather Data</h1>

        <div className="header-menu-right">
          <div className="full-form">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
