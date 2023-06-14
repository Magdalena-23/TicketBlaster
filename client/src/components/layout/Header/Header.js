import Navigation from "../../common/Nav/Navigation";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import Button from "../../common/Button/Button";

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
          <Button className={classes.btn}>Login</Button>
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? classes["active-btn"] : undefined
          }
          end
        >
          <Button className={classes.btn}>Create Account</Button>
        </NavLink>
      </div>
    </LayoutComponent>
  );
};

export default Header;
