import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, addDogBtn } from "../../store/dogs-slice";
import Button from "../UI/Button/Button"
import DogForm from '../DogForm/DogForm'
import Dog from "../Dog/Dog"
import classes from "./DogsList.module.css"

function DogsList() {
  const userId = useSelector((state) => state.user.user._id)
  const userLogged = useSelector((state) => state.user.isLogged)
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs.dogs)
  const showForm = useSelector((state) => state.dogs.showForm)

  useEffect(() => {
    dispatch(fetchDogs(userId, userLogged))
  }, [])
  
  
  return (
   
    <div className={classes.dogs}>
       { console.log(dogs) }
      {dogs.map(dog => {
        return (
          <Dog key={dog._id} {...dog}/>
        );
      })}
      <Button onClick={() => dispatch(addDogBtn())} className={classes["bg-small"]}
        //ToDo - check this link: disableBtn={dogsCtx.showForm}
        // disableBtn={showForm}
      >+Add A Dog</Button>
      {showForm && <DogForm/>}
    </div>
  )
}

export default DogsList  