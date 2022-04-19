import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dog from "../Dog/Dog"
import Button from "../UI/Button/Button"
import classes from "./DogsList.module.css"
import { useUsersContext } from "../../Context/user-context"
import DogForm from '../DogForm/DogForm'

function DogsList() {
  const usersCtx = useUsersContext();
  const [dogs, setDogs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //להביא את הכלבים של היוזר
  useEffect(() => {
    fetch(`/api/dogs/users/${usersCtx.user._id}`)
      .then(response => response.json())
      .then(data => setDogs(data));
  }, []);

  const AddADogHandler = () => {
    setShowForm(true);
  }
  
  const hideFormFunc = () => {
    setShowForm(false);
  }

  return (
    <div className={classes.dogs}>
      {dogs.map(dog => {
        return (
          <Dog key={dog._id} {...dog} />
        );
      })}
      <Button onClick={AddADogHandler} className={classes["bg-small"]} disableBtn={showForm}>+Add A Dog</Button>
      {showForm && <DogForm hideForm={hideFormFunc}/>}
    </div>
  )
}

export default DogsList