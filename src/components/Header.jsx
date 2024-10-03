import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/images/logo.png";
import "../assets/styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" />®
      </Link>

      <Link to="/">
        <div className="header-title">
          <h1>Le Roi Du Burger</h1>
        </div>
      </Link>
      <Link to="/">
        <img src={logo} alt="logo" />®
      </Link>

      <div className="icon-header">
        <Link to="/consoleAdmin">
          <CgProfile />
        </Link>
      </div>
    </header>
  );
};

export default Header;
