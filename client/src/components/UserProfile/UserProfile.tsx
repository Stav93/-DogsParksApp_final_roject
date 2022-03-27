import React, { useState } from 'react'
import { useUsersContext } from "../../Context/user-context"
import { useParams, useNavigate, Link } from "react-router-dom";
import classes from "./UserProfile.module.css"

function UserProfile() {
  const usersCtx = useUsersContext();
  const params = useParams();
  const dogsHandler = useNavigate()
  const parksHandler = useNavigate()
  const [activeDogs, setActiveDogs] = useState(false);
  const [activeParks, setActiveParks] = useState(false);

  const dogsClick = () => {
    dogsHandler("myDogs")
    setActiveDogs(true)
  } 
  const parksClick = () => {
    parksHandler("myParks")
    setActiveParks(true)
  } 

  return (
    <div className={classes.container}>
      <h1>{usersCtx.user.name}</h1>
      <div className={classes.links}>
        {/* <button className={activeDogs ? classes.btnActive : ""} onClick={dogsClick}>My Dogs</button>
        <button className={activeParks ? classes.btnActive : ""} onClick={parksClick}>My Parks</button> */}
        <Link to={"myDogs"}>My Dogs</Link>
        <Link to={"myParks"}>My Parks</Link>
      </div>
    </div>
  )
}

export default UserProfile