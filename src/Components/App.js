import React, { useState, useEffect } from "react";
import Map from "./Map";
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
import { Loader, Dimmer, Icon } from "semantic-ui-react";

function App() {
  const [city, setCity] = useState("phoenix");
  const [cityInfo, setData] = useState({});
  const [hourlyCast, setHourlyCast] = useState([]);
  const [dailyCast, setDailyCast] = useState([]);
  const [currentCast, setCurrentCast] = useState({});
  const [select, setSelect] = useState("today");
  const [offset, setOffset] = useState(0);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

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
    } else if (select === "today") {
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
    } else if (select === "ten day") {
      return <TenDay cast={dailyCast} data={cityInfo} />;
    } else if (select === "map") {
      return <Map coords={[cityInfo.coord.lat, cityInfo.coord.lon]} />;
    }
  };

  return (
    <React.Fragment>
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
