import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dog from "../Dog/Dog"
import Button from "../UI/Button/Button"
import classes from "./DogsList.module.css"
import { useUsersContext } from "../../Context/user-context"
import { useDogsContext } from "../../Context/dogs-context"
import DogForm from '../DogForm/DogForm'

function DogsList() {
  const usersCtx = useUsersContext();
  const dogsCtx = useDogsContext();
  // const [dogs, setDogs] = useState([]);

 // להביא את הכלבים של היוזר
  // useEffect(() => {
  //   fetch(`/api/dogs/users/${usersCtx.user._id}`)
  //     .then(response => response.json())
  //     .then(data => setDogs(data));
  // }, []);

  // const editDogHandler = (e) => {
  //   dogsCtx.EditDogFunc();
  // }

  return (
    <div className={classes.dogs}>
      {dogsCtx.dogs.map(dog => {
        return (
          <Dog key={dog._id} {...dog}/>
          // <Dog key={dog._id} {...dog} onEdit={editDogHandler}/>
        );
      })}
      <Button onClick={dogsCtx.AddADogHandler} className={classes["bg-small"]} disableBtn={dogsCtx.showForm}>+Add A Dog</Button>
      {dogsCtx.showForm && <DogForm hideForm={dogsCtx.hideFormFunc}/>}
      {console.log("showForm:" + dogsCtx.showForm)}
    </div>
  )
}

export default DogsList  