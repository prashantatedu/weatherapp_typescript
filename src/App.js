import React from "react";
import "./App.css";
import "h8k-components";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    // <div className="App">
    //   <h8k-navbar header={title} data-testId="navbar"></h8k-navbar>
    //   <WeatherList />
    // </div>
  );
}

export default App;
