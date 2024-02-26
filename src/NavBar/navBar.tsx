import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  return (
    <nav className="navbar-container">
      <ul>
        <li>
      <NavLink to="/" >
        Home
      </NavLink>
      </li>
      <li>
      <NavLink to="/Texts">Texts</NavLink>
      </li>
      <li>
      <NavLink to="/Settings">Settings</NavLink>
      </li>
      </ul>
    </nav>
  );
}
export default NavBar;