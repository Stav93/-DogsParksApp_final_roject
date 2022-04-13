import React, {useState, useEffect, useReducer} from 'react'
import Button from "../UI/Button/Button"
import classes from "./DogForm.module.css"
import Input from '../Input/input'

function reducerFunc(prevState, action) {
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        ...prevState,
        nameState: { value: action.val, isValid: action.val.trim().length >= 2  },
      };
    case 'YEAR_OF_BIRTH_INPUT':
      return {
        ...prevState,
        yearOfBirthState: { value: action.val },
      };
    case 'WEIGHT_INPUT':
      return {
        ...prevState,
        weightState: { value: action.val },
      };
    case 'LIKES_INPUT':
      return {
        ...prevState,
        likesState: { value: action.val, },
      };
    case 'DISLIKE_INPUT':
      return {
        ...prevState,
        dislikeState: { value: action.val,},
      };
    case 'NAME_BLUR':
      return {
        ...prevState,
        nameState: {value: prevState.nameState.value, isValid: prevState.nameState.value.trim().length >= 2 }
      };
      default:
        return {
          nameState: { value: "", isValid: false },
          yearOfBirthState: { value: "", isValid: false },
          weightState: { value: "", isValid: false },
          likesState: {value: "", isValid: false},
          dislikeState: {value: "", isValid: false}
        }
  }
}

function DogForm({hideForm}) {
  const [message, setMessage] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatchFunc] = useReducer(reducerFunc, {
    nameState: {
      value: '', //state.nameState.value
      isValid: null, //state.nameState.isValid
    },
    yearOfBirthState: {
      value: '', //state.yearOfBirthState.value
      isValid: null, //state.yearOfBirthState.isValid
    },
    weightState: {
      value: '', //state.weightState.value
      isValid: null, //state.weightState.isValid
    },
    likesState: {
      value: '', //state.likesState.value
      isValid: null, //state.likesState.isValid
    },
    dislikeState: {
      value: '', //state.dislikeState.value
      isValid: null, //state.dislikeState.isValid
    },
  })

  const { value: nameValue} = state.nameState;
  const { isValid: nameIsValid} = state.nameState;

  const { value: yearOfBirthValue} = state.yearOfBirthState;
  const { isValid: yearOfBirthIsValid} = state.yearOfBirthState;

  const { value: weightValue} = state.weightState;
  const { isValid: weightIsValid} = state.weightState;

  const { value: likesValue} = state.likesState;
  const { isValid: likesIsValid} = state.likesState;

  const { value: dislikeValue} = state.dislikeState;
  const { isValid: dislikeIsValid} = state.dislikeState;


  useEffect(() => {
    // רוצים לנקות את הטיימר כל פעם שהיוזר סיים להקליד
    const identifier = setTimeout(() => {
      console.log("checking for validity")
      setFormIsValid(
        nameIsValid
      );
    }, 500)
    // מחזירים פונקציה אחת
    // cleanup function
    // תרוץ לפני שיוז אפקט תרוץ פעם הבאה
    // חוץ מבפעם הראשונה
    return () => {
      console.log("cleanup")
      clearTimeout(identifier);
    };
  }, [nameIsValid]);

  // FormValidation
  // פונקציות שמשתמשים בהן כדי לשלוח דרך הדיספאצ 
  //  את האובייקט אקשן שבו יש טייפ ומה שנרצה עוד שישפיע על הסטייט החדש
  const nameChangeHandler = (event) => {
    dispatchFunc({type: 'NAME_INPUT', val: event.target.value});
  };
  const yearOfBirthChangeHandler = (event) => {
    dispatchFunc({type: 'YEAR_OF_BIRTH_INPUT', val: event.target.value});
  };
  const weightChangeHandler = (event) => {
    dispatchFunc({type: 'WEIGHT_INPUT', val: event.target.value});
  };
  const likesChangeHandler = (event) => {
    dispatchFunc({type:"LIKES_INPUT", val: event.target.value});
  };
  const dislikeChangeHandler = (event) => {
    dispatchFunc({type:"DISLIKE_INPUT", val: event.target.value});
  };
  const validateNameHandler = () => {
    dispatchFunc({type: 'NAME_BLUR'});
  };
  // const yearOfBirthChangeHandler = () => {
  //   dispatchFunc({type: 'EMAIL_BLUR'});
  // };
  // const validateCityHandler = () => {
  //   dispatchFunc({type: 'CITY_BLUR'});
  // };
  // const validatePasswordHandler = () => {
  //   dispatchFunc({type: 'PASSWORD_BLUR'});
  // };

  // submit - SignUp
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(nameValue, yearOfBirthValue, weightValue, likesValue, dislikeValue )
    // לשלוח את המידע מהטופס לדאטא בייס ולהוסיף את הכלב
    // clickSignUpHandler("/profile");
  }

  return (
    <div>
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
        label="Year Of Birth" 
        type="date" 
        // isValid={yearOfBirthIsValid} 
        value={yearOfBirthValue}
        onChange={yearOfBirthChangeHandler}
        // onBlur={validateYearOfBirthHandler}
        placeholder="Please enter dog's Year Of Birth"
      />
      {message && <p className={classes.message}>please enter your dog's name</p>}
      <Input
        id="weight"
        label="Weight" 
        type="number" 
        // isValid={weightIsValid} 
        value={weightValue}
        onChange={weightChangeHandler}
        // onBlur={validateWeightHandler}
        placeholder="Please enter your dog's weight"
      />
       <Input
        id="likes"
        label="Likes" 
        type="text" 
        // isValid={likesIsValid} 
        value={likesValue}
        onChange={likesChangeHandler}
        // onBlur={validateLikesHandler}
        placeholder="What does your dog like?"
      />
       <Input
        id="dislike"
        label="Dislike" 
        type="text" 
        // isValid={dislikeIsValid} 
        value={dislikeValue}
        onChange={dislikeChangeHandler}
        // onBlur={validateDislikeHandler}
        placeholder="What does your dog dislike?"
      />
      <div className={classes.actions}>
      <Button type="submit"  className={`${classes.btn} ${classes.btnDog}`} disableBtn={!formIsValid}>
          Add
       </Button>
       <a onClick={hideForm}>cancle</a>
      </div>
    </form>
    </div>
  )
}

export default DogForm