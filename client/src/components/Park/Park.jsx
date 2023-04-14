import { useState , useEffect } from 'react'
import { useSelector } from "react-redux"
import { useUsersContext } from "../../Context/user-context"
import Card from "../UI/Card/Card"
import classes from "./Park.module.css"

function Park({_id, name, city, street, users, OnUpdateParks, index}) {
  const usersCtx = useUsersContext();
  const [like, setLike] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const userId = useSelector((state) => state.user.user._id)

  useEffect(() => {
    if (users) {
      setLikesCount(users.length);
      for (let i = 0; i < users.length; i++) {
        if(users[i]._id === userId) {
          setLike(true);
          break;
        }
      }
    }
    
  }, [users])

  const likesHandler = () => {
    if(!like) {
      usersCtx.onUserLike(_id)
      // users.push(usersCtx.user)
      OnUpdateParks(index, usersCtx.user, true)
      setLikesCount((prev) => prev+1)
      setLike(true)
    } else {
      usersCtx.onUserUnlike(_id)
      // users = users.filter(user => user._id !==  usersCtx.user._id)
      OnUpdateParks(index, usersCtx.user, false)
      setLikesCount((prev) => prev-1)
      setLike(false)
    }
  }

  return (
    <div className={classes.park} >
      <Card>
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
        <button className={classes.like} onClick={likesHandler}>{like ? "unlike" : "Like"} ({likesCount})</button>
        {/* <button className={classes.like} disabled={like} onClick={updatePark}>{like ? "unlike" : "Like"}</button> */}
      </Card>
    </div>
  )
}  

export default Park