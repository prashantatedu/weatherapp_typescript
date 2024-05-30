import { useNavigate } from "react-router-dom";
import Login from "../Login";
import "./index.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated] = useState(true);

  console.log({ isAuthenticated });
  const navigate = useNavigate();

  console.log(isAuthenticated);

  useEffect(() => {
    navigate("/weather");
  }, [isAuthenticated, navigate]);

  return (
    <div className="weather-home" data-testid="weather-list">
      <h3>Welcome to Weather Application</h3>
      <div>
        <span>Already registered</span>
        <Login />
      </div>
    </div>
  );
};

export default Dashboard;
