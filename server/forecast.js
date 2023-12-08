import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { Mongo } from "meteor/mongo";

export const Weather = new Mongo.Collection("forecast");

Meteor.methods({
  async "weather.fetch"() {
    const philadelphiaCoordinates = "39.9526,-75.1652";
    const metadataUrl = `https://api.weather.gov/points/${philadelphiaCoordinates}`;

    try {
      // Step 1: Retrieve metadata for Philadelphia
      const metadataResponse = await fetch(metadataUrl);
      const metadata = await metadataResponse.json();

      // Step 2: Extract the forecast URL from the metadata
      const forecastUrl = metadata.properties.forecast;

      // Step 3: Retrieve the forecast for Philadelphia
      const forecastResponse = await fetch(forecastUrl);
      const forecast = await forecastResponse.json();

      // Step 4: Parse through the properties to extract relevant information
      const forecastPeriods = forecast.properties?.periods || [];
      forecastPeriods.forEach((period, index) => {
        console.log(`Period ${index + 1}:`);
        console.log(`Name: ${period.name}`);
        console.log(`Start Time: ${period.startTime}`);
        console.log(`End Time: ${period.endTime}`);
        console.log(`Is Daytime: ${period.isDaytime}`);
        console.log(
          `Temperature: ${period.temperature} ${period.temperatureUnit}`
        );
        console.log(
          `Probability of Precipitation: ${period.probabilityOfPrecipitation.value}%`
        );
        console.log(
          `Dewpoint: ${period.dewpoint.value} ${period.dewpoint.unitCode}`
        );
        console.log(`Relative Humidity: ${period.relativeHumidity.value}%`);
        console.log(`Wind Direction: ${period.windDirection}`);
        console.log(`Short Forecast: ${period.shortForecast}`);
        console.log(`Detailed Forecast: ${period.detailedForecast}`);
        console.log("\n");
      });

      Weather.insert({
        timestamp: new Date(),
        data: forecast,
      });

      console.log("Forecast for Philadelphia:\n", forecast);
      return forecast;
    } catch (err) {
      console.error("Error trying to fetch forecast: ", err);
      throw new Meteor.Error(
        "forecast-fetch-failure",
        "Failed to fetch forecast data"
      );
    }
  },
});
