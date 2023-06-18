import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./LoggedInNav.module.css";
import { useAuth } from "../../../context/AuthContext";

function LoggedInNav() {
  const { logout } = useAuth();
  const [pageTitle, setPageTitle] = useState("Tickets History");

  const updatePageTitle = (text) => {
    setPageTitle(text);
  };

  const location = useLocation();
  const showSecondNavBar =
    location.pathname === "/tickets-history" ||
    location.pathname === "/profile";

  if (!showSecondNavBar) {
    return null;
  }

  return (
    <div className={classes.container}>
      <h1>{pageTitle}</h1>
      <div className={classes["profile-nav"]}>
        <NavLink
          to="tickets-history"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          onClick={() => updatePageTitle("Tickets History")}
          end
        >
          Tickets History
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? classes["active"] : undefined
          }
          onClick={() => updatePageTitle("User Details")}
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
