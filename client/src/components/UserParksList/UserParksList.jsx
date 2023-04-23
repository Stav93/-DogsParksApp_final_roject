import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserParks } from "../../store/parks-slice"
import Park from "../Park/Park"
import classes from "./UserParksList.module.css"


function UserParksList() {
  const userId = useSelector((state) => state.user.user._id)
  // const parks = useSelector((state) => state.parks.parks)
  const usersParks = useSelector((state) => state.parks.usersParks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserParks(userId))
    // console.log(park)
  }, []);
      
  return (   
    <div className={classes.parks}>
      {usersParks.map((park, index) => {
        return (
          <Park key={park._id} index={index} {...park} />
          // <Park key={park._id} index={index} {...park} OnUpdateParks={updateParks} />
        );
      })}
    </div>
  )
}

export default UserParksList