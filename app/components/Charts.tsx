import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

interface WeatherForecastProps {
  forecastData: any; // Replace 'any' with the actual type of your forecast data
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  // Extract data for different charts from forecastData
  if (!forecastData || !forecastData.properties.periods) {
    return <p>No forecast data available.</p>;
  }

  // Example: Short Forecast Data
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

  // You can similarly extract data for other charts like wind direction, humidity, etc.

  // Chart Configuration for Short Forecast
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

  // Chart Configuration for Temperature
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
          type: "linear", // Assuming temperature is plotted against a numerical scale
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

  // Chart Configuration for Temperature
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
          type: "linear", // Assuming temperature is plotted against a numerical scale
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

  // Render the component with multiple charts
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div>
        <h2>Today's Forecast:</h2>
        {mostRecentDetailed}
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
      {/* Add more charts for wind direction, humidity, etc. */}
    </div>
  );
};

export default WeatherForecast;
