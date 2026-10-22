import { Link, NavLink } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./Header.css";

function Header() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <Link className="logo" to="/">
        VIN Decoder
      </Link>
      <nav aria-label="Main">
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/variables">Variables</NavLink>
          </li>
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggle}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
