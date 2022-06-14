import React, { useState } from 'react'
import { useUsersContext } from "../../Context/user-context"
import { NavLink, Outlet } from "react-router-dom";
import classes from "./UserProfile.module.css"

function UserProfile() {
  const usersCtx = useUsersContext();

  return (
    <div className={classes.container}>

      <h1>Hi {usersCtx.user.name}!</h1>
      <div className={classes.links}>
        <NavLink to={"dogs"} className={({ isActive }) =>
          isActive ? classes.active : undefined
        }>My Dogs
        </NavLink>
        <NavLink to={"parks"}
          className={({ isActive }) =>
            isActive ? classes.active : undefined
          }
        >My Parks
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default UserProfile