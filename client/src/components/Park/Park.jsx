import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, updatePark, updateUserLike } from "../../store/parks-slice";
import { useUsersContext } from "../../Context/user-context";
import Card from "../UI/Card/Card";
import classes from "./Park.module.css";

function Park({ _id, name, city, street, users, OnUpdateParks, index }) {
  const usersCtx = useUsersContext();
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [btnContent, setBtnContent] = useState("");

  const userId = useSelector((state) => state.user.user._id);
  const userLike = useSelector((state) => state.parks.userLike);
  const totalLikes = useSelector((state) => state.parks.totalLikes);
  // const park = useSelector((state) => state.parks.park);
  // const user = useSelector((state) => state.user.user)
  const park = useSelector((state) => state.parks.park);
  const parkId = _id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePark({ _id, name, city, street, users }));
  }, []);

  const updateLikesHandler = () => {
    if (userLike) {
      dispatch(
        removeLike({ userId, parkId })
      );
    } else
      dispatch(addLike({ userId, parkId }));
  };

  // const updateLikesHandler = () => {
  //   const user = park.users.find(user => user._id === userId)
  //   console.log(user)
  //    console.log(park.users.includes(user.Id))
  //   if (park.users && park.users.includes(user)) {
  //     dispatch(
  //       removeLike({ userId, parkId })
  //     );
  //   } else
  //     dispatch(addLike({ userId, parkId }));
  // };

  // useEffect(() => {
  //   const user = park.users.find((user) => user._id === userId);
  //   if (park.users.includes(user)) {
  //     setLike(true)
  //   } 
  // }, [park]);

  // {/* {console.log(park.users.find((user) => user._id === userId))}

  // useEffect(() => {
  //   const user = park.users.find((user) => user._id === userId);
  //   if (park.users.includes(user)) {
  //     console.log("entered");
  //     setLike(true)
  //   }
  // }, [park]);

  // useEffect(() => {
  //   if (users) {
  //     setLikesCount(users.length);
  //     for (let i = 0; i < users.length; i++) {
  //       if (users[i]._id === userId) {
  //         setLike(true);
  //         break;
  //       }
  //     }
  //   }
  // }, [users]);

  // const likesHandler = () => {
  //   if (!like) {
  //     usersCtx.onUserLike(_id);
  //     // users.push(usersCtx.user)
  //     OnUpdateParks(index, usersCtx.user, true);
  //     setLikesCount((prev) => prev + 1);
  //     setLike(true);
  //   } else {
  //     usersCtx.onUserUnlike(_id);
  //     // users = users.filter(user => user._id !==  usersCtx.user._id)
  //     OnUpdateParks(index, usersCtx.user, false);
  //     setLikesCount((prev) => prev - 1);
  //     setLike(false);
  //   }
  // };

  return (
    <div className={classes.park}>
      <Card>
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
        <button className={classes.like} onClick={updateLikesHandler}>
          {/* {park.users.includes(user) ? "unlike" : "like"} ({likesCount}) */}
          {"like/unlike"} ({likesCount})
          {/* {like ? "unlike" : "like"} ({likesCount}) */}
        </button>
        {/* <button className={classes.like} onClick={likesHandler} >{like ? "unlike" : "Like"} ({likesCount})</button> */}
      </Card>
    </div>
  );
}

export default Park;
