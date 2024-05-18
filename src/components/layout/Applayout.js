import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./Applayout.css";

export default function Applayout() {
  return (
    <div className="weather-container">
      <Header />
      <Outlet />
    </div>
  );
}
