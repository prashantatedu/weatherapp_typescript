import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
import Login from "../Login";
import Logout from "../Logout";
import { Link, useLocation } from "react-router-dom";

type SearchType = "M" | "L" | "";
const Header = () => {
  const location = useLocation();
  console.log(location.pathname);
  let searchType: SearchType = "";
  if (location?.pathname) {
    if (location?.pathname === "/weather") {
      searchType = "L";
    } else if (location?.pathname === "/mapweather") {
      searchType = "M";
    }
  }

  const { isAuthenticated } = useAuth0();
  const title = "Weather Dashboard";
  return (
    <nav className="app-header fixed">
      <div className="layout-row justify-content-between">
        <section className="logo">{title}</section>
        <div className="sidebar">
          {searchType === "L" && <Link to="mapweather">Map Search</Link>}
          {searchType === "M" && <Link to="weather">Loc Search</Link>}
          <section>{!isAuthenticated ? <Login /> : <Logout />}</section>
        </div>
      </div>
    </nav>
  );
};

export default Header;
