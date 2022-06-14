import React from 'react'
import { useUsersContext } from "../../../Context/user-context"
import classes from "./Navigation.module.css"
import { NavLink } from "react-router-dom"

function Navigation() {
  const { user, onLogout, isLoggedIn } = useUsersContext()
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            {/* add style to active page */}
            <NavLink to={`/profile/${user.name.replace(/ /g,"")}/dogs`} 
              className={({ isActive }) => {
                return isActive ? classes.active : undefined
              }}
              >
                My Profile 
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to={`/parks`}  className={({ isActive }) => {
                return isActive ? classes.active : undefined
              }}
              >All Parks
              </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation