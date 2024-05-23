import { createBrowserRouter } from "react-router-dom";
import Applayout from "../components/Applayout";
import Dashboard from "../components/Dashboard";
import WeatherHome from "../components/WeatherHome";
import WeatherMap from "../components/WeatherMap";
import ListCities, { loader as citieLoader } from "../components/ListCities";

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
      {
        path: "/mapweather",
        element: <WeatherMap />,
      },
      {
        path: "/listcities/:stateId",
        element: <ListCities />,
      },
    ],
  },
]);
