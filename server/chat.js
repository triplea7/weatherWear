import { Meteor } from "meteor/meteor";
import axios from "axios";
require("dotenv").config();

Meteor.methods({
  async "get.outfit"(forecast) {
    try {
      const prompt = `Based on the forecast for today:\n${forecast}\n\nHelp me decide what to wear!`;
      const apiKey = process.env.REACT_APP_OPEN_AI_KEY;
      console.log(apiKey);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that gives clothing recommendations based on the weather.",
            },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const reply = response.data.choices[0]?.message?.content;
      return reply || "Unable to generate outfit recommendation.";
    } catch (error) {
      console.error("Error in getting recommendation:", error.message);
      throw new Meteor.Error(
        `api-error w key ${apiKey}, Unable to get outfit recommendation from ChatGPT.`
      );
    }
  },
});
