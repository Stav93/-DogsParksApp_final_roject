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

function Park({ _id, name, city, street, users, OnUpdateParks, index }) {
  const usersCtx = useUsersContext();
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [btnContent, setBtnContent] = useState("");

  const userId = useSelector((state) => state.user.user._id);
  // const userLike = useSelector((state) => state.parks.userLike)
  const totalLikes = useSelector((state) => state.parks.totalLikes);
  const user = useSelector((state) => state.user.user);
  const currentPark = useSelector((state) => state.parks.currentPark);
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
  const usersParks = useSelector((state) => state.parks.usersParks);

  const dispatch = useDispatch();
  
  const updateLikesHandler = () => {
    if (park.users.some((user) => user._id === userId)) {
      dispatch(removeLike({ userId, parkId }));
    } else {
      dispatch(addLike({ userId, parkId }));
    }
  };

  return (
    <div className={classes.park}>
      <Card>
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
        <button className={classes.like} onClick={updateLikesHandler}>
          {users && users.some(user => user._id === userId)  ? "unlike" : "like"} ({likesCount})
        </button>
      </Card>
    </div>
  );
}

export default Park;
