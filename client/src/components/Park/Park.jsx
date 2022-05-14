import { useState } from 'react'
import Card from "../UI/Card/Card"
import classes from "./Park.module.css"
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import {useUsersContext} from "../../Context/user-context"

function Park({_id, name, city, street, addLikeHandler}) {
  const usersCtx = useUsersContext();
  const [like, setLike] = useState(false)

  const updatePark = async () => {
    if (!like) {
      try {
        const userId = usersCtx.user._id;
        const respone = await fetch(`/api/parks/${_id}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId}),
        });
        // addLikeHandler(park);
        setLike(true)
      } catch (error) {
        console.log("Error: " + error)
      } 
    };
  }

  return (
    <div className={classes.park} >
      <Card>
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
        <button className={classes.like} disabled={like} onClick={updatePark}>{like ? "unlike" : "Like"}</button>
      </Card>
    </div>
  )
}  

export default Park