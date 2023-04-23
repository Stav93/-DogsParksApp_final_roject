import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  updatePark,
  updateUserLike,
} from "../../store/parks-slice";
import { useUsersContext } from "../../Context/user-context";
import Card from "../UI/Card/Card";
import classes from "./Park.module.css";

function Park({
  _id,
  name,
  city,
  street,
  users,
  userLike,
  OnUpdateParks,
  index,
}) {
  const usersCtx = useUsersContext();
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [btnContent, setBtnContent] = useState("");

  const userId = useSelector((state) => state.user.user._id);
  const totalLikes = useSelector((state) => state.parks.totalLikes);
  const user = useSelector((state) => state.user.user);
  const park = {
    _id,
    name,
    city,
    street,
    users,
    OnUpdateParks,
    index,
  };
  const parkId = _id;

  const parks = useSelector((state) => state.parks.parks);
  const usersParks = useSelector((state) => state.usersParks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePark({ _id, name, city, street, users }));
  }, [parks, usersParks]);

  const updateLikesHandler = () => {
    if (user && users &&  users.some(user => user._id === userId)) {
      dispatch(removeLike({ userId, parkId }));
    } else {
      dispatch(addLike({ userId, parkId }));
    }
  };

  // useEffect(() => {
  //   if (user && users && users.some(user => user._id === userId)) {
  //     setBtnContent("unlike")
  //   } else {
  //     setBtnContent("like")
  //   }
  // },[park])

  return (
    <div className={classes.park}>
      <Card>
        {console.log("parkId", parkId)} 
        {console.log("users", users)}
        {console.log("user", user)}
        {/* {user && users && console.log( users.includes(user))}  */}
        {user && users && console.log( users.some(user => user._id === userId))} 
        {/* {console.log(users.includes(user))}  */}
        {/* {console.log(users.includes(user => user._id === userId))}  */}
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
          <button className={classes.like} onClick={updateLikesHandler}>
          {/* {btnContent} ({likesCount}) */}
          {user && users && users.some(user => user._id === userId)  ? "unlike" : "like"} ({likesCount})
        </button>
      </Card>
    </div>
  );
}

export default Park;
