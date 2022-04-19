import { useState } from 'react'
import Card from "../UI/Card/Card"
import classes from "./Dog.module.css"
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'

function Dog({_id, name, year_of_birth, weight, likes, dislike}) {
  const [showPopUp, setShowPopUp] = useState(false)

  const deletePopUpHandler = () => {
    setShowPopUp(true);
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
  }

  const hidePopUp = () => {
    setShowPopUp(false);
  }

  return (
    <div className={classes.dog}>
      {showPopUp && <Modal onClose={hidePopUp}>
          <h3>Are you sure you want to delete this dog?</h3>
          <Button className={`${classes.btn} ${classes.btnDog}`} onClick={deleteDogHandler}> Delete</Button>
      </Modal>}
      <Card>
        <label>{name}</label>
        <h3>year of birth: {year_of_birth}</h3>
        <h3>weight: {weight}</h3>
        <h3>likes: {likes}</h3>
        <h3>dislike: {dislike}</h3>
        <div className={classes.icons}>
          <div className={classes.icon} onClick={deletePopUpHandler}>
            <i className="fas fa-trash fa-1x"></i>
            <label>Delete</label>
          </div>
          <div className={classes.icon}>
            <i className="fas fa-pen fa-1x"></i>
            <label>Edit</label>
           </div>
        </div>
      </Card>
    </div>
  )
}  

export default Dog