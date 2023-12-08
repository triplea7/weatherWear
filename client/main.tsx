import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../app/components/Homepage";
import Forecast from "../app/components/Forecast";
import React from "react";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Forecast />
    </BrowserRouter>
  );
};

Meteor.startup(() => {
  renderApp();
});
