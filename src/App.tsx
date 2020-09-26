import React, { useState } from "react";
import "./App.css";
import Chart from "./Chart";
import Search from "./Search";

function App() {
  const [countryName, setcountryName] = useState<string>("japan");

  return (
    <div className="App">
      <h1>COVID-19 Tracker</h1>
      <Search setcountryName={setcountryName} />
      <Chart country={{ name: countryName }} />
    </div>
  );
}

export default App;
