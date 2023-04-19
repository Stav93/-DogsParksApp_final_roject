import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/user-slice"
import { useUsersContext } from "../../../Context/user-context";
import classes from "./Navigation.module.css";

function Navigation() {
  // const { user, onLogout, isLoggedIn } = useUsersContext();
  const user = useSelector((state) => state.user.user)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

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
