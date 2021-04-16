import "./App.css";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function App() {
  const [miles, setMiles] = useState(1000); //setting state as 1000
  const [hours, setHours] = useState('Non Peak Hours');
  
  let rateA = 2973.15358 + (.3 * miles * .15); //rate A with rate $0.15/kWh 
  let rateBPeek = 2266.93177 + (.3 * miles * .2); //rate B with rate $0.20/kwH peek hours 12pm - 6pm
  let rateBOffPeek = 2266.93177 + (.3 * miles * .08); //rate B with rate $0.08/kwH off peek hours, hours otherwise
  

  console.log(hours);

  const data = {
    labels: ["Rate A", "Rate B"],
    datasets: [
      {
        label:"Electric Bill",
        data: [rateA, hours === "Between noon and 6pm" ? rateBPeek : rateBOffPeek],
        backgroundColor: "rgb(58, 17, 184)",
      },
    
     
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }



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
        <select name="hours" id="hours" onChange={(e) => setHours(e.target.value)}>
          <option value="Non Peak Hours">Non Peak Hours</option>
          <option value="Between noon and 6pm">Between noon and 6pm</option>
          {/* <option value="(Unpredictable)">All hours (Unpredictable)</option> */}
        </select>
      </div>

      <div className="bar-graph">
        <h1 className="bar-graph-title">Rate Comparison</h1>

        <Bar data={data} options={options} width={320} height={150} />
      </div>
    </div>
  );
}

export default App;
