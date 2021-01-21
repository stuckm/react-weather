import { Icon } from "semantic-ui-react";
import moment from "moment";

export const addComma = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const desc = [
  {
    keyword: "clear",
    icon: "sun outline",
    color: "orange",
  },
  {
    keyword: "cloud",
    icon: "cloud",
    color: "grey",
  },
  {
    keyword: "rain",
    icon: "rain",
    color: "grey",
  },
  {
    keyword: "thunder",
    icon: "thunder",
    color: "yellow",
  },
  {
    keyword: "snow",
    icon: "snowflake outline",
    color: "white",
  },
];

export const windDir = [
  {
    name: "NNE",

    value: [11.25, 33.75],
  },
  {
    name: "NE",

    value: [33.75, 56.25],
  },
  {
    name: "ENE",

    value: [56.25, 78.75],
  },
  {
    name: "E",

    value: [78.75, 101.25],
  },
  {
    name: "ESE",

    value: [101.25, 123.75],
  },
  {
    name: "SE",

    value: [123.75, 146.25],
  },
  {
    name: "SSE",

    value: [146.25, 168.75],
  },
  {
    name: "S",

    value: [168.75, 191.25],
  },
  {
    name: "SSW",

    value: [191.25, 213.75],
  },
  {
    name: "W",

    value: [213.75, 236.25],
  },
  {
    name: "WSW",

    value: [236.25, 258.75],
  },
  {
    name: "W",

    value: [258.75, 281.25],
  },
  {
    name: "WNW",

    value: [281.25, 303.75],
  },
  {
    name: "NW",

    value: [303.75, 326.25],
  },
  {
    name: "NNW",

    value: [326.25, 348.75],
  },
];

export const getIcon = (info, size, time, offset) => {
  let date = moment.unix(time).utc();
  date.add(offset, "s");
  let hour = date.format("H");
  return desc.map((item) => {
    if (info.includes(item.keyword)) {
      console.log(hour, info);
      if (info.includes("clear") && (hour < 5 || hour > 20)) {
        console.log("dit it");
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
