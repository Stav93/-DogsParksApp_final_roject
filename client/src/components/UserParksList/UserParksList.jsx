import React, {useState, useEffect} from 'react'
import Park from "../Park/Park"
import classes from "./UserParksList.module.css"
import { useUsersContext } from "../../Context/user-context"

function UserParksList() {
  const usersCtx = useUsersContext();
  const [parks, setParks] = useState([])

  useEffect(() => {
    fetch(`/api/parks/users/${usersCtx.user._id}`)
    .then(response => response.json())
    .then(data => setParks(data));
  }, []);
      
  return (   
    <div className={classes.parks}>
      {parks.map(park => {
        return (
          <Park key={park._id} {...park}/>
        );
      })}
    </div>
  )
}

export default UserParksList