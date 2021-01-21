import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Container, Select } from "semantic-ui-react";

const options = {
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "day",
        },
      },
    ],
  },
};

const createStuff = (data, type) => {
  return data.map((day) => {
    let date = moment.unix(day.dt);
    let formatDate = date.format("MM/DD");
    let temp = day.temp[type];
    var obj = {};
    obj["x"] = formatDate;
    obj["y"] = temp;
    return obj;
  });
};

const selectOptions = [
  { value: "max", text: "Maximum" },
  { value: "min", text: "Minimum" },
  { value: "morn", text: "Morning" },
  { value: "night", text: "Night" },
  { value: "eve", text: "Evening" },
  { value: "day", text: "Daytime" },
];

function LineGraph({ cast, cityInfo }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState("max");

  useEffect(() => {
    let stuff = createStuff(cast, type);
    setData(stuff);
  }, [type, data]);

  const checking = selectOptions.map((option) => {
    if (type.includes(option.value)) {
      return option.text;
    }
  });

  return (
    <Container>
      <h3>
        Daily {checking} Temperatures for {cityInfo.name}
      </h3>
      <Select
        options={selectOptions}
        value={type}
        onChange={(e, { value }) => setType(value)}
        style={{ marginBottom: "20px" }}
      />
      <div>
        {data?.length > 0 && (
          <Line
            options={options}
            data={{
              datasets: [
                {
                  borderColor: "#a5b5bf",
                  fill: false,
                  data: data,
                },
              ],
            }}
          />
        )}
      </div>
    </Container>
  );
}

export default LineGraph;
