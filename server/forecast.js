import { Meteor } from "meteor/meteor";
import fetch from "meteor/fetch";
import { SyncedCron } from "meteor/littledata:synced-cron";

SyncedCron.config({
  log: false,
});

Meteor.startup(() => {
  SyncedCron.add({
    name: "Fetching Forecast",
    schedule(parser) {
      return parser.text("every 1 hour");
    },
    job() {
      const api =
        "https://api.weather.gov/gridpoints/PHI/50,50/forecast/hourly";

      try {
        const res = fetch(api, {
          headers: {
            "User-Agent": "(weatherWear.com, alyssa.antonian07@gmail.com)",
          },
        });
        const forecast = res.json();
        console.log(`Forecast:\n${forecast}`);
      } catch (err) {
        console.error("Error trying to fetch forecast: ", err);
      }
    },
  });
});
