import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Country from "./Country";
import Center from "./Center";

type LiveByCountryAndStatusJSON = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
};

interface LiveByCountryAndStatus {
  name: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  date: string;
}

function Chart(props: { country: Country }) {
  const [error, setError] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<LiveByCountryAndStatus[]>([]);
  const countryName = props.country.name;

  const url =
    "https://api.covid19api.com/live/country/" +
    countryName +
    "/status/confirmed";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          const json: LiveByCountryAndStatusJSON[] = result;
          const covid19Data = json.map(
            (item) =>
              ({
                name: item.Country,
                confirmed: item.Confirmed,
                deaths: item.Deaths,
                recovered: item.Recovered,
                active: item.Active,
                date: item.Date.toLocaleString().substring(0, 10),
              } as LiveByCountryAndStatus)
          );
          setItems(covid19Data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Center>
        <LineChart width={600} height={300} data={items}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="#ff4500" />
          <Line type="monotone" dataKey="recovered" stroke="#00bfff" />
          <Line type="monotone" dataKey="active" stroke="#556b2f" />
        </LineChart>
      </Center>
    );
  }
}

export default Chart;
