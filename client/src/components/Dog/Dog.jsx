import { useState } from 'react'
import Card from "../UI/Card/Card"
import classes from "./Dog.module.css"
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import {useDogsContext} from "../../Context/dogs-context"

function Dog({_id, name, year_of_birth, weight, likes, dislike, onEdit}) {
  const dogsCtx = useDogsContext();
  const [showDeletePopUp, setShowDeletePopUp] = useState(false)

  const deletePopUpHandler = () => {
    setShowDeletePopUp(true);
  }

  const deleteDogHandler = async () => {
    hidePopUp();
    try {
      const respone = await fetch(`/api/dogs/${_id}`,  
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({_id}),
        }
      );
     }
      catch (error) {
         console.log("Error: " + error)
       } 
       window.location.reload();
  }

  const hidePopUp = () => {
    setShowDeletePopUp(false);
  }

  const editDogHandler = () => {
    dogsCtx.EditDogFunc({_id, name, year_of_birth, weight, likes, dislike});
  }

  return (
    <div className={classes.dog}>
      {showDeletePopUp && <Modal onClose={hidePopUp}>
          <h3>Are you sure you want to delete this dog?</h3>
          <Button className={`${classes.btn} ${classes.btnDog}`} onClick={deleteDogHandler}> Delete</Button>
          <a onClick={hidePopUp}>cancle</a>
      </Modal>}
      <Card>
        <label>{name}</label>
        <h3>Year of birth: {year_of_birth}</h3>
        <h3>Weight: {weight}</h3>
        <h3>Likes: {likes}</h3>
        <h3>Dislike: {dislike}</h3>
        <div className={classes.icons}>
          <div className={classes.icon} onClick={deletePopUpHandler}>
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
  )
}  

export default Dog