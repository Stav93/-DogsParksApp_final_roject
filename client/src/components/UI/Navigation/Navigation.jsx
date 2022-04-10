import React from 'react'
import { useUsersContext } from "../../../Context/user-context"
import classes from "./Navigation.module.css"
import { Link } from "react-router-dom"

function Navigation() {
  const { user, onLogout, isLoggedIn } = useUsersContext()
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            {/* add style to active page */}
            <Link to={`/profile/${user.name}`}>My Profile</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to={`/parks`}>Parks</Link>
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