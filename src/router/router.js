import { createBrowserRouter } from "react-router-dom";
import Applayout from "../components/layout/Applayout";
import Dashboard from "../components/layout/Dashboard";
import WeatherHome from "../components/layout/WeatherHome";

export const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/weather",
        element: <WeatherHome />,
      },
    ],
  },
]);
