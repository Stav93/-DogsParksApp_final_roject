import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserParks, fetchParks } from "../../store/parks-slice";
import Park from "../Park/Park";
import classes from "./UserParksList.module.css";

function UserParksList() {
  const userId = useSelector((state) => state.user.user._id);
  // const parks = useSelector((state) => state.parks.parks)
  const parks = useSelector((state) => state.parks.parks);
  const dispatch = useDispatch();
  let userParks;

  // useEffect(() => {
  //   dispatch(getUserParks(userId))
  //   // console.log(park)
  // }, []);

  useEffect(() => {
    dispatch(fetchParks(userId));
  }, []);

  return (
    <div className={classes.parks}>
      {parks.map((park, index) => {
        if (park.users.some((user) => user._id === userId))
        return <Park key={park._id} index={index} {...park} />;
      })}
    </div>
  );
}

export default UserParksList;
