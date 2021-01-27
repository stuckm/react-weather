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
import { Loader, Dimmer } from "semantic-ui-react";

function App() {
  const [city, setCity] = useState("phoenix");
  const [cityInfo, setData] = useState({});
  const [hourlyCast, setHourlyCast] = useState([]);
  const [dailyCast, setDailyCast] = useState([]);
  const [currentCast, setCurrentCast] = useState({});
  const [select, setSelect] = useState("today");
  const [offset, setOffset] = useState(0);
  const [load, setLoad] = useState(false);

  const key = "eca311ff23cf5f22c22f3a925f51bd5f";

  /*
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://api.ipify.org?format=jsonhttps://api.ipify.org?format=json"
      );
      setIp(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (ip) {
      const getData = async () => {
        await fetch(`https://ipinfo.io/${ip}/geo`)
          .then((res) => res.json)
          .then((data) => console.log(data));
      };
      getData();
    }
  }, [ip]);
  */

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast?",
        {
          params: {
            q: city,
            appid: key,
            units: "imperial"
          }
        }
      );
      setData(data.city);
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
    setLoad(!load);
    setCity(queryCity);
  };
  const setTopCity = (e) => {
    setLoad(!load);
    setCity(e);
  };

  const selectedItem = () => {
    if (select === "today") {
      return <Today cast={currentCast} data={cityInfo} daily={dailyCast} />;
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
      <TopCities changeCity={setTopCity} />
      <Headline cast={currentCast} data={cityInfo} />
      <Interface
        cast={currentCast}
        data={cityInfo}
        setSelect={(item) => setSelect(item)}
      />
      {load ? (
        selectedItem()
      ) : (
        <Dimmer active inverted>
          <Loader size="massive" />
        </Dimmer>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;
