import React, { useState, useEffect } from "react";
import FullMap from "./FullMap";
import Header from "./Header";
import Headline from "./Headline";
import HourlyCast from "./HourlyCast";
import TenDay from "./TenDay";
import Today from "./Today";
import Footer from "./Footer";
import Interface from "./Interface";
import TopCities from "./TopCities";
import axios from "axios";
import "./App.css";
import {
  Loader,
  Dimmer,
  Icon,
  Modal,
  Button,
  Form,
  Input
} from "semantic-ui-react";

function App() {
  const [city, setCity] = useState("phoenix");
  const [cityInfo, setData] = useState({});
  const [hourlyCast, setHourlyCast] = useState([]);
  const [dailyCast, setDailyCast] = useState([]);
  const [currentCast, setCurrentCast] = useState({});
  const [select, setSelect] = useState("current");
  const [offset, setOffset] = useState(0);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [modalCity, setModalCity] = useState("");
  const [open, setOpen] = useState(true);

  const key = "eca311ff23cf5f22c22f3a925f51bd5f";

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`
      )
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json(); //we only get here if there is no error
        })
        .then((data) => {
          setData(data.city);
          setError("");
        })
        .catch((err) => {
          err.text().then((errorMessage) => {
            const text = errorMessage.slice(24, 38);
            setError(text);
            setLoad(!load);
          });
        });
    };
    getData();
  }, [city]);

  useEffect(() => {
    if (cityInfo.coord) {
      const getData = async () => {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/onecall?",
          {
            params: {
              lat: cityInfo.coord.lat,
              lon: cityInfo.coord.lon,
              appid: key,
              units: "imperial"
            }
          }
        );
        setOffset(data.timezone_offset);
        setDate(data.current.dt);
        setHourlyCast(data.hourly);
        setCurrentCast(data.current);
        setDailyCast(data.daily);
        setLoad(!load);
      };
      getData();
    }
  }, [cityInfo]);

  const handleRequest = (e) => {
    e.preventDefault();
    const queryCity = e.target.elements.city.value;
    if (queryCity === city) {
      return;
    }
    setLoad(!load);
    setCity(queryCity);
  };

  const setTopCity = (e) => {
    if (e === city) {
      return;
    }
    setLoad(!load);
    setCity(e);
  };

  const handleModalCity = () => {
    if (modalCity === city || modalCity === "") {
      return;
    }
    setLoad(!load);
    setOpen(false);
    setCity(modalCity);
  };

  const selectedItem = () => {
    if (error !== "") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "65vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {" "}
          <Icon name="warning" size="massive" />
          <h1 style={{ fontSize: "4rem", fontWeight: "bolder", color: "grey" }}>
            {error}
          </h1>
        </div>
      );
    } else if (select === "current") {
      return (
        <Today
          cast={currentCast}
          data={cityInfo}
          daily={dailyCast}
          hourly={hourlyCast}
          offset={offset}
          date={date}
        />
      );
    } else if (select === "hourly") {
      return <HourlyCast cast={hourlyCast} offset={offset} />;
    } else if (select === "daily") {
      return <TenDay cast={dailyCast} data={cityInfo} />;
    } else if (select === "map") {
      return <FullMap coords={[cityInfo.coord.lat, cityInfo.coord.lon]} />;
    }
  };

  return (
    <React.Fragment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="home-modal"
      >
        <Modal.Header>Welcome to Weather Data! </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <h1>Search a City to get started</h1>
          </Modal.Description>
        </Modal.Content>
        <Form
          onSubmit={() => handleModalCity()}
          style={{ width: "90%", marginLeft: "30px", marginBottom: "15px" }}
        >
          <Form.Field>
            <input
              onChange={(e) => setModalCity(e.target.value)}
              value={modalCity}
              placeholder="Search..."
            />
          </Form.Field>
        </Form>
        <Modal.Actions>
          <Button
            content="Search"
            labelPosition="right"
            icon="search"
            onClick={() => handleModalCity()}
            positive
          />
        </Modal.Actions>
      </Modal>
      <Header data={cityInfo} getWeather={handleRequest} />
      {!error ? (
        <>
          <TopCities changeCity={setTopCity} />
          <Headline
            cast={currentCast}
            data={cityInfo}
            date={date}
            offset={offset}
          />
          <Interface
            cast={currentCast}
            data={cityInfo}
            setSelect={(item) => setSelect(item)}
          />
        </>
      ) : null}
      {load ? (
        selectedItem()
      ) : (
        <div style={{ height: "100vh" }}>
          <Dimmer active>
            <Loader inverted size="massive" />
          </Dimmer>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;
