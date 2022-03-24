import React, { useState } from 'react'
import { useUsersContext } from "../../Context/user-context"
<<<<<<< HEAD
import { useParams, useNavigate, Link } from "react-router-dom";
import classes from "./UserProfile.module.css"
=======
import { useParams } from "react-router-dom";
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104

function UserProfile() {
  const usersCtx = useUsersContext();
  const params = useParams();
<<<<<<< HEAD
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
=======
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104

  return (
    <div className={classes.container}>
      <h1>{usersCtx.user.name}</h1>
<<<<<<< HEAD
      <div className={classes.links}>
        {/* <button className={activeDogs ? classes.btnActive : ""} onClick={dogsClick}>My Dogs</button>
        <button className={activeParks ? classes.btnActive : ""} onClick={parksClick}>My Parks</button> */}
        <Link to={"myDogs"}>My Dogs</Link>
        <Link to={"myParks"}>My Parks</Link>
      </div>
    </div>
=======
      <h2>{params.userName}</h2>
    </>
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104
  )
}

export default UserProfile