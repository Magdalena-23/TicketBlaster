import SearchBar from "../SearchBar/SearchBar";
import Navigation from "../UI/Navigation";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import LayoutComponent from "./LayoutComponent";

const Header = () => {
  return (
    <LayoutComponent position="fixed">
      <Navigation />
      <div>
        <SearchBar />
        <div className={classes["auth-buttons"]}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes["active-btn"] : undefined
            }
            end
          >
            <button className={classes.btn}>Login</button>
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? classes["active-btn"] : undefined
            }
            end
          >
            <button className={classes.btn}>Create Account</button>
          </NavLink>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Header;
