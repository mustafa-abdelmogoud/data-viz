import React from "react";

import Face from "./Face";
import "./App.css";
import Population from "./Population";
import PopulationScatterPlot from "./PopulationScatterPlot";
import TemperatureLineChart from "./TemperatureLineChart";
import TemperatureAreaChart from "./TemperatureAreaChart";

function App() {
  return (
    <div className="App">
      <Face />
      <Population />
      <PopulationScatterPlot />
      <TemperatureLineChart />
      <TemperatureAreaChart />
    </div>
  );
}

export default App;
