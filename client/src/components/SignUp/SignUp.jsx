import React, { useState, useReducer, useEffect} from "react"
import Input from "../Input/input"
import Button from "../UI/Button/Button"
import classes from "./SignUp.module.css"
import { useUsersContext } from "../../Context/user-context"
import { useNavigate, Link } from "react-router-dom"

// reducerFunc => (prevState, action) [via dispatchFunc]
// state - האחרון שנמצא שם, לא הראושני, כמו ביוז סטייס
function reducerFunc(prevState, action) {
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        ...prevState,
        nameState: { value: action.val, isValid: action.val.trim().length >= 2  },
      };
    case 'EMAIL_INPUT':
      return {
        ...prevState,
        emailState: { value: action.val, isValid: action.val.includes('@') },
      };
    case 'CITY_INPUT':
      return {
        ...prevState,
        cityState: { value: action.val, isValid: action.val.trim().length >= 2 },
      };
    case 'PASSWORD_INPUT':
      return {
        ...prevState,
        passwordState: { value: action.val, isValid: action.val.trim().length >= 6 },
      };
    case 'NAME_BLUR':
      return {
        ...prevState,
        nameState: {value: prevState.nameState.value, isValid: prevState.nameState.value.trim().length >= 2 }
      };
    case 'EMAIL_BLUR':
      return {
        ...prevState,
        emailState: {value: prevState.emailState.value, isValid: prevState.emailState.value.includes('@')}
      };
    case 'CITY_BLUR':
      return {
        ...prevState,
        cityState: {value: prevState.emailState.value, isValid: prevState.emailState.value.trim().length >= 2 }
      };
    case 'PASSWORD_BLUR':
      return {
        ...prevState,
        passwordState: {value: prevState.passwordState.value, isValid: prevState.passwordState.value.trim().length >= 6}
      };
      default:
        return {
          nameState: { value: "", isValid: false },
          emailState: { value: "", isValid: false },
          cityState: {value: "", isValid: false},
          passwordState: {value: "", isValid: false}
        }
  }
}

function SignUp()  {
  const usersCtx = useUsersContext();
  const [formIsValid, setFormIsValid] = useState(false);
  const clickSignUpHandler = useNavigate()

  // USE_REDUCER
  // const [state, dispatchFunc] = useReducer(reducerFunc, initialState);
  const [state, dispatchFunc] = useReducer(reducerFunc, {
    nameState: {
      value: '', //state.nameState.value
      isValid: null, //state.nameState.isValid
    },
    emailState: {
      value: '', //state.emailState.value
      isValid: null, //state.emailState.isValid
    },
    cityState: {
      value: '', //state.cityState.value
      isValid: null, //state.cityState.isValid
    },
    passwordState: {
      value: '', //state.passwordState.value
      isValid: null, //state.passwordState.isValid
    },
  })

  const { value: nameValue} = state.nameState;
  const { isValid: nameIsValid} = state.nameState;

  const { value: emailValue} = state.emailState;
  const { isValid: emailIsValid} = state.emailState;

  const { value: cityValue} = state.cityState;
  const { isValid: cityIsValid} = state.cityState;

  const { value: passwordValue} = state.passwordState;
  const { isValid: passwordIsValid} = state.passwordState;


  useEffect(() => {
    // רוצים לנקות את הטיימר כל פעם שהיוזר סיים להקליד
    const cleanup = setTimeout(() => {
      console.log("checking for validity")
      setFormIsValid(
        nameIsValid && emailIsValid && cityIsValid && passwordIsValid
      );
    }, 500)
    // מחזירים פונקציה אחת
    // cleanup function
    // תרוץ לפני שיוז אפקט תרוץ פעם הבאה
    // חוץ מבפעם הראשונה
    return () => {
      console.log("cleanup")
      clearTimeout(cleanup);
    };
  }, [nameIsValid, emailIsValid, cityIsValid, passwordIsValid]);

  // FormValidation
  // פונקציות שמשתמשים בהן כדי לשלוח דרך הדיספאצ 
  //  את האובייקט אקשן שבו יש טייפ ומה שנרצה עוד שישפיע על הסטייט החדש
  const nameChangeHandler = (event) => {
    dispatchFunc({type: 'NAME_INPUT', val: event.target.value});
  };
  const emailChangeHandler = (event) => {
    dispatchFunc({type: 'EMAIL_INPUT', val: event.target.value});
  };
  const cityChangeHandler = (event) => {
    dispatchFunc({type: 'CITY_INPUT', val: event.target.value});
  };
  const passwordChangeHandler = (event) => {
    dispatchFunc({type:"PASSWORD_INPUT", val: event.target.value});
  };
  const validateNameHandler = () => {
    dispatchFunc({type: 'NAME_BLUR'});
  };
  const validateEmailHandler = () => {
    dispatchFunc({type: 'EMAIL_BLUR'});
  };
  const validateCityHandler = () => {
    dispatchFunc({type: 'CITY_BLUR'});
  };
  const validatePasswordHandler = () => {
    dispatchFunc({type: 'PASSWORD_BLUR'});
  };

  // submit - SignUp
  const submitHandler = async (event) => {
    event.preventDefault();
    usersCtx.onSignUp(state.nameState.value, state.emailState.value, state.cityState.value, state.passwordState.value);
    // clickSignUpHandler("/profile");
  }
  return (
    <>
    <h2>Sign Up</h2>
    <form onSubmit={submitHandler}>
     <Input
        id="name"
        label="Name" 
        type="name" 
        isValid={nameIsValid} 
        value={nameValue}
        onChange={nameChangeHandler}
        onBlur={validateNameHandler}
        placeholder="Please enter your Name"
      />
     <Input
        id="email"
        label="Email" 
        type="email" 
        isValid={emailIsValid} 
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        placeholder="Please enter your Email"
      />
     <Input
        id="city"
        label="City" 
        type="city" 
        isValid={cityIsValid} 
        value={cityValue}
        onChange={cityChangeHandler}
        onBlur={validateCityHandler}
        placeholder="Please enter a City"
      />
      <Input
        id="password"
        label="password" 
        type="password" 
        isValid={passwordIsValid} 
        value={passwordValue}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        placeholder="Please enter your password"
      />
      <div className={classes.actions}>
      <Button type="submit" className={classes.btn} disableBtn={!formIsValid}>
          SignUp
       </Button>
       {usersCtx.message && <p className={classes.loginMessage}>please enter valid values</p>}
       <div>
        <span className={classes.signUp}><Link to="/login">login instead</Link></span> 
      </div>
      </div>
    </form>
    </>
  )
}

export default SignUp
