import React, { useState } from 'react'
import { useUsersContext } from "../../Context/user-context"
import { Link, Outlet } from "react-router-dom";
import classes from "./UserProfile.module.css"

function UserProfile() {
  const usersCtx = useUsersContext();

  return (
    <div className={classes.container}>
      <h1>{usersCtx.user.name}</h1>
      <div className={classes.links}>
        <Outlet/>
        <Link to={"myDogs"} >My Dogs</Link>
        <Link to={"myParks"}>My Parks</Link>
      </div>
    </div>
  )
}

export default UserProfile