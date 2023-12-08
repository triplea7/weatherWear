import React, { useEffect, useState } from "react";
import WeatherForecast from "./Charts";
import { Meteor } from "meteor/meteor";

const Forecast = () => {
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
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
