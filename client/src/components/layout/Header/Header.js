import Navigation from "../../common/Navigation";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import LayoutComponent from "../LayoutComponent/LayoutComponent";

const Header = () => {
  return (
    <LayoutComponent styles={classes.styles} layout={classes.layout}>
      <div className={classes["header"]}>
        <Navigation />
      </div>
      <div className={classes["header"]}>
        <div className={classes["search-bar"]}>
          <input type="text" placeholder="Search" />
        </div>
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
    </LayoutComponent>
  );
};

export default Header;
