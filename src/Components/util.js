import { Icon } from "semantic-ui-react";
import moment from "moment";

export const addComma = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const desc = [
  {
    keyword: "clear",
    icon: "sun outline",
    color: "orange"
  },
  {
    keyword: "cloud",
    icon: "cloud",
    color: "grey"
  },
  {
    keyword: "rain",
    icon: "rain",
    color: "grey"
  },
  {
    keyword: "thunder",
    icon: "thunder",
    color: "yellow"
  },
  {
    keyword: "snow",
    icon: "snowflake outline",
    color: "white"
  }
];

export const windDir = [
  {
    name: "NNE",

    value: [11.25, 33.75]
  },
  {
    name: "NE",

    value: [33.75, 56.25]
  },
  {
    name: "ENE",

    value: [56.25, 78.75]
  },
  {
    name: "E",

    value: [78.75, 101.25]
  },
  {
    name: "ESE",

    value: [101.25, 123.75]
  },
  {
    name: "SE",

    value: [123.75, 146.25]
  },
  {
    name: "SSE",

    value: [146.25, 168.75]
  },
  {
    name: "S",

    value: [168.75, 191.25]
  },
  {
    name: "SSW",

    value: [191.25, 213.75]
  },
  {
    name: "W",

    value: [213.75, 236.25]
  },
  {
    name: "WSW",

    value: [236.25, 258.75]
  },
  {
    name: "W",

    value: [258.75, 281.25]
  },
  {
    name: "WNW",

    value: [281.25, 303.75]
  },
  {
    name: "NW",

    value: [303.75, 326.25]
  },
  {
    name: "NNW",

    value: [326.25, 348.75]
  }
];

export const checkDir = (deg) => {
  if (deg > 348.75 || deg < 11.25) {
    return "N";
  } else {
    return windDir.map((item) => {
      if (deg >= item.value[0] && deg <= item.value[1]) {
        return item.name;
      }
    });
  }
};

export const getIcon = (info, size, time, offset) => {
  let date = moment.unix(time).utc();
  date.add(offset, "s");
  let hour = date.format("H");
  return desc.map((item) => {
    if (info.includes(item.keyword)) {
      if (info.includes("clear") && (hour < 5 || hour > 20)) {
        return <Icon size={size} name="moon outline" color={"yellow"} />;
      } else {
        return <Icon size={size} name={item.icon} color={item.color} />;
      }
    }
  });
};

export const createDate = (dt, format, offset) => {
  let date = moment.unix(dt).utc();
  date.add(offset, "s");
  let formatDate = date.format(format);
  return <div>{formatDate}</div>;
};

export const createDescrip = (info) => {
  return (
    <p>
      {info.weather[0].description} with temperatures around{" "}
      <span>{Math.floor(info.temp)} &deg; F.</span>
      {info.pop > 0 ? (
        <span> Precipitation is forecasted. </span>
      ) : (
        <span> No precipitation forecasted </span>
      )}{" "}
      and wind speeds near {Math.floor(info.wind_speed)} MPH{" "}
      <span>{checkDir(info.wind_deg)}</span>.
    </p>
  );
};
