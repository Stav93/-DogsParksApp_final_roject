import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
// import { login} from "../../store/user-actions";
import { login, setMessage } from "../../store/user-slice";
import { fetchDogs } from "../../store/dogs-slice";
import Input from "../Input/input";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";
import { useUsersContext } from "../../Context/user-context";
import { Link } from "react-router-dom";

// reducerFunc => (prevState, action) [via dispatchFunc]
// state - האחרון שנמצא שם, לא הראושני, כמו ביוז סטייס
function reducerFunc(prevState, action) {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...prevState,
        emailState: { value: action.val, isValid: action.val.includes("@") },
      };
    case "PASSWORD_INPUT":
      return {
        ...prevState,
        passwordState: {
          value: action.val,
          isValid: action.val.trim().length >= 6,
        },
      };
    case "EMAIL_BLUR":
      return {
        ...prevState,
        emailState: {
          value: prevState.emailState.value,
          isValid: prevState.emailState.value.includes("@"),
        },
      };
    case "PASSWORD_BLUR":
      return {
        ...prevState,
        passwordState: {
          value: prevState.passwordState.value,
          isValid: prevState.passwordState.value.trim().length >= 6,
        },
      };
    default:
      return {
        emailState: { value: "", isValid: false },
        passwordState: { value: "", isValid: false },
      };
  }
}

function Login() {
  const usersCtx = useUsersContext();
  const [formIsValid, setFormIsValid] = useState(false);
  const userData = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMessage = useSelector((state) => state.user.loginMessage)

  // USE_REDUCER
  // const [state, dispatchFunc] = useReducer(reducerFunc, initialState);
  const [state, dispatchFunc] = useReducer(reducerFunc, {
    emailState: {
      value: "", //state.emailState.value
      isValid: null, //state.emailState.isValid
    },
    passwordState: {
      value: "", //state.passwordState.value
      isValid: null, //state.passwordState.isValid
    },
  });

  const { value: emailValue, isValid: emailIsValid } = state.emailState;
  const { value: passwordValue, isValid: passwordIsValid } =
    state.passwordState;

  useEffect(() => {
    // רוצים לנקות את הטיימר כל פעם שהיוזר סיים להקליד
    const cleanup = setTimeout(() => {
      console.log("checking for validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    // מחזירים פונקציה אחת
    // cleanup function
    // תרוץ לפני שיוז אפקט תרוץ פעם הבאה
    // חוץ מבפעם הראשונה
    return () => {
      console.log("cleanup");
      clearTimeout(cleanup);
    };
  }, [emailIsValid, passwordIsValid]);

  // FormValidation
  // פונקציות שמשתמשים בהן כדי לשלוח דרך הדיספאצ
  //  את האובייקט אקשן שבו יש טייפ ומה שנרצה עוד שישפיע על הסטייט החדש
  const emailChangeHandler = (event) => {
    dispatchFunc({ type: "EMAIL_INPUT", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchFunc({ type: "PASSWORD_INPUT", val: event.target.value });
  };
  const validateEmailHandler = () => {
    dispatchFunc({ type: "EMAIL_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchFunc({ type: "PASSWORD_BLUR" });
  };

  // submit - login
  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(
      login({
        email: state.emailState.value,
        password: state.passwordState.value,
      })
    );
    // dispatch(fetchDogs(userData._id))
  };

  useEffect(() => {
    if (userData.name !== "") {
      navigate(`/profile/${userData.name?.replace(/ /g, "")}`);
    } else {
      navigate('/login');
    }
  }, [userData])
  
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={submitHandler} className={classes.login}>
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
          <Button
            type="submit"
            className={classes.btn}
            disableBtn={!formIsValid}
          >
            Login
          </Button>
          {loginMessage && (
            <p className={classes.loginMessage}>one or more is not correct</p>
          )}
          <div>
            <span className={classes.signUp}>
              <Link to="/sign-up">sign up instead</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
