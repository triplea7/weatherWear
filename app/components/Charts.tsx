import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

interface WeatherForecastProps {
  forecastData: any;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  const [outfitRecc, setOutfitRec] = useState("");
  const [clickedGenerate, setClicked] = useState(false);

  if (!forecastData || !forecastData.properties.periods) {
    return <p>No forecast data available.</p>;
  }

  const labels = forecastData.properties.periods.map(
    (period: any) => period.name
  );

  const detailedForecastData = forecastData.properties.periods.map(
    (period: any) => period.detailedForecast
  );
  const mostRecentDetailed = detailedForecastData[0];

  const temperatureData = forecastData.properties.periods.map(
    (period: any) => period.temperature
  );

  const precipitationData = forecastData.properties.periods.map(
    (period: any) => period.probabilityOfPrecipitation.value
  );

  const humitdityData = forecastData.properties.periods.map(
    (period: any) => period.relativeHumidity.value
  );

  const humidityChart = {
    labels: labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humitdityData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
    options: {
      scales: {
        x: {
          type: "time",
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  };

  const temperatureChart = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (F)",
        data: temperatureData,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "X-axis Label",
          },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Temperature (F)",
          },
        },
      },
    },
  };

  const precipChart = {
    labels: labels,
    datasets: [
      {
        label: "Chance of Precipitation (%)",
        data: precipitationData,
        backgroundColor: "rgba(75,192,192,.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "X-axis Label",
          },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Chance of Precipitation (%)",
          },
        },
      },
    },
  };

  const clothingRecs = async () => {
    await Meteor.call("get.outfit", mostRecentDetailed, (error, result) => {
      if (error) {
        console.error("Error fetching outfit recc:", error);
      } else {
        setOutfitRec(result);
        console.log(result);
      }
    });
  };

  return (
    <div>
      <div>
        <h2 className="colored-border">Today's Forecast:</h2>
        {mostRecentDetailed}
        <div>
          <b> Don't know how to dress for this kind of weather? Click below!</b>
        </div>
        <br></br>
        <button
          onClick={async () => {
            clothingRecs();
            setClicked(true);
          }}
        >
          Generate outfit
        </button>
        {clickedGenerate && (
          <div>
            <h3>Recommendation:</h3>
            {outfitRecc}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Temperature</h2>
          <Bar data={temperatureChart} />
        </div>
        <div>
          <h2>Humidity</h2>
          <Line data={humidityChart} />
        </div>
        <div>
          <h2>Chance of Precipitation</h2>
          <Bar data={precipChart} />
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
