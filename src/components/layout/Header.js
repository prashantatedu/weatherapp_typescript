import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";
import Login from "./Login";
import Logout from "./Logout";

export default function Header() {
  const { isAuthenticated } = useAuth0();
  const title = "Weather Dashboard";
  return (
    <nav className="app-header fixed">
      <div class="layout-row justify-content-between">
        <section className="logo">{title}</section>
        <section>{!isAuthenticated ? <Login /> : <Logout />}</section>
      </div>
    </nav>
  );
}
