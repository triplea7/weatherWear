import { Link } from "react-router-dom";
import React from "react";

function HomePage() {
  return (
    <div>
      <h1
        className="colored-border"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome to WeatherWear!
      </h1>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        For when you don't know the weather means!
      </h2>
    </div>
  );
}

export default HomePage;
