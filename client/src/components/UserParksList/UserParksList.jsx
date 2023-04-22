import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserParks, updateParks } from "../../store/parks-slice"
import { useUsersContext } from "../../Context/user-context"
import Park from "../Park/Park"
import classes from "./UserParksList.module.css"


function UserParksList() {
  const usersCtx = useUsersContext();
  const userId = useSelector((state) => state.user.user._id)

  const parks = useSelector((state) => state.parks.parks)
  const usersParks = useSelector((state) => state.parks.usersParks)
  const dispatch = useDispatch()

  

  console.log(parks)

  useEffect(() => {
    dispatch(getUserParks(userId))
    // console.log(park)
  }, []);

  //parks.park.users

  // const updateParks = (parkIndex, user, isLike) => {
  //   if(isLike) {
  //     // setParks(parks[parkIndex].users.push(user));
  //     const parksNew = parks.map((park ,index) => {
  //       if(index !== parkIndex) return park; 
  //         else {
  //           park.users.push(user);
  //           return park;
  //         } 
  //     })
  //     setParks(parksNew)
  //   } else {
  //     const parksNew = parks.map((park ,index) => {
  //       if(index !== parkIndex) return park; 
  //       else {
  //         let usersArr = park.users.filter(u => u._id !== user._id);
  //         park.users = usersArr;
  //         return park;
  //       } 
  //     })
  //     setParks(parksNew)
  //     // setParks(parks[parkIndex].users = parks[parkIndex].users.filter(u => u._id !== user._id))
  //   }
  // }
      
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