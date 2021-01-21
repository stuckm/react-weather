import React from "react";
import { Form, Button } from "semantic-ui-react";

const SearchForm = ({ getWeather }) => {
  const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ];
  return (
    <Form onSubmit={getWeather}>
      <Form.Group>
        <label style={{ margin: "5px auto" }}>
          Enter a City, State or Country for weather info
        </label>
      </Form.Group>

      <Form.Group
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        widths="equal"
      >
        <input
          type="submit"
          style={{ width: "40%", marginRight: "10px" }}
          name="city"
          type="text"
        ></input>
        <Button style={{ backgroundColor: "#abc8c7" }} type="submit">
          Search
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
