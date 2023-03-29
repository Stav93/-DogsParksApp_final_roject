import React from "react";
import { NavLink } from "react-router-dom";
import { useUsersContext } from "../../../Context/user-context";
import classes from "./Navigation.module.css";

function Navigation() {
  const { user, onLogout, isLoggedIn } = useUsersContext();
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to={`/profile/${user.name?.replace(/ /g, "")}/dogs`}
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/parks`}
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                All Parks
              </NavLink>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
