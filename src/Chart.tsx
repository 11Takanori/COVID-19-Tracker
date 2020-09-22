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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Countries from "./Countries";
import "./Chart.css";

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

function Chart() {
  const [countryName, setcountryName] = useState<string>("japan");
  const [error, setError] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<LiveByCountryAndStatusJSON[]>([]);

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
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [countryName]);

  const covid19Data = items.map(
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

  const searchCountry = (event: any) => {
    const country = Countries.find(
      (object) => object.Country === event.target.value
    );

    if (country) {
      setcountryName(country.Slug);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="search">
          <div style={{ width: 400 }}>
            <Autocomplete
              className="countryName"
              freeSolo
              options={Countries.map((option) => option.Country)}
              defaultValue="Japan"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by country"
                  margin="normal"
                  variant="outlined"
                />
              )}
              onSelect={(event) => searchCountry(event)}
            />
          </div>
        </div>
        <div className="chart">
          <LineChart width={600} height={300} data={covid19Data}>
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
        </div>
      </div>
    );
  }
}

export default Chart;
