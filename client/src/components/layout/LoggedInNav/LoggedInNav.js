import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./LoggedInNav.module.css";
import { useAuth } from "../../../context/AuthContext";
import Title from "../../common/Title/Title";
import { decodeAdmin } from "../../../helpers/jwtDecode";

function LoggedInNav(props) {
  const { logout } = useAuth();
  const admin = decodeAdmin();

  return (
    <div className={classes.container}>
      <Title>{props.header}</Title>
      <div className={classes["profile-nav"]}>
        {admin && (
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? classes["active"] : undefined
            }
            end
          >
            Events
          </NavLink>
        )}
        {admin && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? classes["active"] : undefined
            }
            end
          >
            Users
          </NavLink>
        )}
        <NavLink
          to="/tickets-history"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          end
        >
          Tickets History
        </NavLink>
        <NavLink
          to="/user-details"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          end
        >
          User Details
        </NavLink>
        <NavLink to="/">
          <button className={classes.btn} onClick={logout}>
            Log Out
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default LoggedInNav;
