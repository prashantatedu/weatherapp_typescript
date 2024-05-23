import Header from "../Header";
import { Outlet } from "react-router-dom";
import "./index.css";

const Applayout = () => {
  return (
    <div className="weather-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Applayout;
