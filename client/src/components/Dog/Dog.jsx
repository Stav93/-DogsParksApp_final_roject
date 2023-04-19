import { useDispatch, useSelector } from "react-redux";
import { deleteDog } from "./../../store/dogs-slice";
import {
  showDeleteDogPopUp,
  hideDeleteDogPopUp,
  editDog,
} from "../../store/dogs-slice";
import Card from "../UI/Card/Card";
import classes from "./Dog.module.css";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

function Dog({ _id, name, year_of_birth, weight, likes, dislike }) {
  const dispatch = useDispatch();
  const showDeletePopUp = useSelector((state) => state.dogs.showDeletePopUp);
  const dogId = useSelector((state) => state.dogs.dog._id);

  const editDogHandler = () => {
    // update the dog state -> state.dogs.dog
    dispatch(editDog({ _id, name, year_of_birth, weight, likes, dislike }));
  };

  // show delete dog pop up
  const dogDeletePopUp = () => {
    dispatch(
      showDeleteDogPopUp({
        _id,
        name,
        year_of_birth,
        weight,
        likes,
        dislike,
      })
    );
  };

  const hideDeleteDogPopUpHansler = () => {
    dispatch(hideDeleteDogPopUp());
  };

  //delete a dog
  const deleteDogHandler = () => {
    dispatch(deleteDog(dogId));
  };

  return (
    <div className={classes.dog}>
      {showDeletePopUp && (
        <Modal onClose={hideDeleteDogPopUpHansler}>
          <div className={classes.deletePopUp}>
            <h3>Are you sure you want to delete this dog?</h3>
            <Button
              className={`${classes.btn} ${classes.btnDog}`}
              onClick={deleteDogHandler}
            >
              {" "}
              Delete
            </Button>
            <a onClick={hideDeleteDogPopUpHansler}>cancle</a>
          </div>
        </Modal>
      )}
      <Card>
        <label>{name}</label>
        <h3>Year of birth: {year_of_birth}</h3>
        <h3>Weight: {weight}</h3>
        <h3>Likes: {likes}</h3>
        <h3>Dislike: {dislike}</h3>
        <div className={classes.icons}>
          <div className={classes.icon} onClick={dogDeletePopUp}>
            <i className="fas fa-trash fa-1x"></i>
            <label>Delete</label>
          </div>
          <div className={classes.icon} onClick={editDogHandler}>
            <i className="fas fa-pen fa-1x"></i>
            <label>Edit</label>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dog;
