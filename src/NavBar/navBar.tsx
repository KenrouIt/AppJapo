import { NavLink } from "react-router-dom";
import "./navbar.css";

export function NavBar() {
    return (
      <nav className="navbar-container">
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/index.tsx.../Texts">Texts</NavLink>
        <NavLink to="/index.tsx.../Settings">Settings</NavLink>
      </nav>
    );
}