import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";
import "./index.css";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();

  console.log({ isAuthenticated });
  const navigate = useNavigate();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    navigate("/weather");
  }

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
