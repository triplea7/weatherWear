import React, { useEffect, useState } from "react";
import WeatherForecast from "./Charts"; // Import the WeatherForecast component
import { Meteor } from "meteor/meteor";

const Forecast = () => {
  const [forecastData, setForecastData] = useState<any>(null); // Replace 'any' with the actual type of your forecast data

  useEffect(() => {
    // Make an API call to fetch weather data when the component mounts
    Meteor.call("weather.fetch", (error, result) => {
      if (error) {
        console.error("Error fetching weather forecast:", error);
      } else {
        setForecastData(result);
      }
    });
  }, []);

  return (
    <div>
      {forecastData ? (
        <WeatherForecast forecastData={forecastData} />
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default Forecast;
