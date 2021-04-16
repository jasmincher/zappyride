import "./App.css";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

function App() {
  const [miles, setMiles] = useState(1000); //setting state as 1000
  const [hours, setHours] = useState("Non Peak Hours");

  // let rateA = 2973.15358 + (.3 * miles * .15); //rate A with rate $0.15/kWh
  // let rateBPeek = 2266.93177 + (.3 * miles * .2); //rate B with rate $0.20/kwH peak hours 12pm - 6pm
  // let rateBOffPeek = 2266.93177 + (.3 * miles * .08); //rate B with rate $0.08/kwH off peek hours, hours otherwise

  let rateA = 2973.15358; //rate A with rate $0.15/kWh
  let rateB = 2266.93177; //rate B with rate $0.20/kwH peak hours 12pm - 6pm or with rate $0.08/kwH off peek hours

  const data = {
    labels: ["Rate A", "Rate B"],
    datasets: [
      {
        label: "Electric Bill",
        data: [
          rateA,
          rateB,
        ],
        backgroundColor: "rgb(58, 17, 184)",
      },
      {
        label: "EV Bill",
        data: [
          0.3 * miles * 0.15,
          hours === "Between noon and 6pm"
            ? 0.3 * miles * 0.2
            : 0.3 * miles * 0.08,
        ],
        backgroundColor: "pink",
      },
    ],
  };
  

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },

    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return "$" + tooltipItem.yLabel.toFixed(2);
        },
      },
    },
  };


  let rateATotal =   data.datasets[0].data[0] +  data.datasets[1].data[0]; //based on the graph I'm finding the electric bill plus the ev bill for rate A
  let rateBTotal =   data.datasets[0].data[1] + data.datasets[1].data[1]; //based on the graph I'm finding the electric bill plus the ev bill for rate B
  let savings = rateATotal < rateBTotal ? rateBTotal - rateATotal : rateATotal - rateBTotal; //here I'm substracting the lowest rate from the highest rate to get the amount of savings
  let saveMore =  rateATotal < rateBTotal ? "Rate A" : "Rate B"; //setting a string to use latter based on which rate is greater


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
        <select
          name="hours"
          id="hours"
          onChange={(e) => setHours(e.target.value)}
        >
          <option value="Non Peak Hours">Non Peak Hours</option>
          <option value="Between noon and 6pm">Between noon and 6pm</option>
          {/* <option value="(Unpredictable)">All hours (Unpredictable)</option> */}
        </select>
      </div>

      <div className="bar-graph">
        <h1 className="bar-graph-title">Rate Comparison</h1>
        
        <div id="save-more">you can save more if you choose {saveMore}, you can save ${savings.toFixed(2)}</div>
        <Bar data={data} options={options} width={320} height={150} />
  

      </div>
    </div>
  );
}

export default App;
