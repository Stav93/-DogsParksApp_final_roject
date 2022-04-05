import React, {useState} from 'react'
import Button from "../UI/Button/Button"
import classes from "./DogForm.module.css"
import Input from '../Input/input'

function DogForm() {
  const [message, setMessage] = useState(false)

  const submitHandler = () => {
    
  }

  return (
    <div>
      DogForm
      <form onSubmit={submitHandler} className={classes.form}>
      <Input
        id="name"
        label="Name" 
        type="text" 
        isValid={nameIsValid} 
        value={nameValue}
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
        placeholder="Please enter dog's Name"
      />
     <Input
        id="yearOfBirth"
        label="yearOfBirth" 
        type="text" 
        isValid={yearOfBirthIsValid} 
        value={yearOfBirthValue}
        onChange={yearOfBirthChangeHandler}
        onBlur={validateYearOfBirthHandler}
        placeholder="Please enter dog's Year Of Birth"
      />
      {message && <p className={classes.message}>please enter your dog's name</p>}
      <Input
        id="weight"
        label="weight" 
        type="text" 
        isValid={weightIsValid} 
        value={weightValue}
        onChange={weightChangeHandler}
        onBlur={validateWeightHandler}
        placeholder="Please enter your dog's weight"
      />
       <Input
        id="likes"
        label="likes" 
        type="text" 
        isValid={likesIsValid} 
        value={likesValue}
        onChange={likesChangeHandler}
        onBlur={validateLikesHandler}
        placeholder="What does your dog like?"
      />
       <Input
        id="dislike"
        label="dislike" 
        type="text" 
        isValid={dislikeIsValid} 
        value={dislikeValue}
        onChange={dislikeChangeHandler}
        onBlur={validateDislikeHandler}
        placeholder="What does your dog dislike?"
      />
      <div className={classes.actions}>
      <Button type="submit"  className={classes.btn} disableBtn={!formIsValid}>
          Login
       </Button>
      </div>
    </form>
    </div>
  )
}

export default DogForm