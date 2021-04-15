import "./App.css";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function App() {
  const [miles, setMiles] = useState(1000); //setting state as 1000
  const data = {
    labels: ["Rate A", "Rate B"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <div className="App">
      <div className="select-options">
        <label for="rates" id="rates-label">
          Choose your rate
        </label>
        <select name="rates" id="rates">
          <option value="rate a">Rate A</option>
          <option value="rate b">Rate B</option>
        </select>

        <label for="miles" id="miles-label">
          Miles driven per year
        </label>
        <input
          type="range"
          id="miles"
          name="miles"
          min="1000"
          max="10000"
          step="1000"
          onChange={(e) => setMiles(e.target.value)}
        >
          {/* //here I setting the state so whenever I move the slider it changes the text */}
        </input>

        {/* and here it will display that text */}
        <label for="miles" id="miles-range">
          {miles} Miles
        </label>

        <label for="hours" id="hours-label">
          Choose your hours
        </label>
        <select name="hours" id="hours">
          <option value="option 1">Between 5am and 9am</option>
          <option value="option 2">Between noon and 6pm</option>
          <option value="option 3">All hours (Unpredictable)</option>
        </select>
      </div>

      <div className="bar-graph">
        <h1 className="bar-graph-title">Rate Comparison</h1>
        <Bar
          data={data}
          width={320}
          height={150}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
