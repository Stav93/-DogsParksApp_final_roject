import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dog from "../Dog/Dog"
import Button from "../UI/Button/Button"
import classes from "./DogsList.module.css"
import { useDogsContext } from "../../Context/dogs-context"
import DogForm from '../DogForm/DogForm'

function DogsList() {
  const dogsCtx = useDogsContext();

  return (
    <div className={classes.dogs}>
      {dogsCtx.dogs.map(dog => {
        return (
          <Dog key={dog._id} {...dog}/>
        );
      })}
      <Button onClick={dogsCtx.AddADogHandler} className={classes["bg-small"]} disableBtn={dogsCtx.showForm}>+Add A Dog</Button>
      {dogsCtx.showForm && <DogForm hideForm={dogsCtx.hideFormFunc}/>}
    </div>
  )
}

export default DogsList  