import React, { useState, useContext, useMemo, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const UsersContext = React.createContext({});

const UsersContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false)
  const [signupMessage, setSignupMessage] = useState(false)
  const [user, setUser] = useState({});
  const clickLogInHandler = useNavigate();
  const clickLogOutHandler = useNavigate();
  const navigate = useNavigate();


  useEffect(() => {
    const storedUserLoggedInInformaition = localStorage.getItem('isLoggedIn');
    // אם אני לא מחוברת ללכת תלוגין אחרת כלום
    // או אם לא עובד בהכל אז להשאיר ככה אלא פה יבדוק מה יש בראוט פט לוקיישן ולשים בנביגייט


    if (storedUserLoggedInInformaition !== null) {
      const userData = JSON.parse(storedUserLoggedInInformaition);
      setUser(userData);
      setIsLoggedIn(true);
      navigate(`/profile/${userData.name?.replace(/ /g, "")}`);
    } else {
      navigate('/login');
    }
  }, [])

  const loginHandler = useCallback(async (email, password) => {
    // לשלוח את השם והסיסמא לסרבר ולבדוק אם יש יוזר עם הסיסמא והמייל
    // אם כן הוא מחזיר אותו
    try {
      const respone = await fetch("/api/users/login",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const userData = await respone.json();
      if (userData !== undefined) {
        localStorage.setItem("isLoggedIn", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        clickLogInHandler(`/profile/${userData.name?.replace(/ /g, "")}/dogs`);
      }
    }
    catch (error) {
      setLoginMessage(true);
      setTimeout(() => {
        setLoginMessage(false);
      }, 3000)
      // console.log("Error: " + error)
    }
  }, []);

  const signUpHandler = async (name, email, city, password) => {
    try {
      const respone = await fetch("/api/users/signup",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, city, password }),
        }
      );

      const userData = await respone.json();
      if (userData !== undefined) {
        localStorage.setItem("isLoggedIn", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        console.log(userData);
        clickLogInHandler(`/profile/${userData.name?.replace(/ /g, "")}`);
      }
    }
    catch (error) {
      setSignupMessage(true);
      setTimeout(() => {
        setSignupMessage(false);
      }, 3000)
      console.log("Error: " + error)
    }
  }
    ;

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    clickLogOutHandler("/login")
  }

  const addLikesHandler = async (parkId) => {
    try {
      const userId = user._id;
      const respone = await fetch(`/api/parks/${parkId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await respone.json();
      console.log(data)
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  const removeLikesHandler = async (parkId) => {
    try {
      const userId = user._id;
      const respone = await fetch(`/api/parks/${parkId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await respone.json();
      console.log(data)
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  const value = useMemo(() => ({
    isLoggedIn: isLoggedIn,
    loginMessage: loginMessage,
    signupMessage: signupMessage,
    onLogout: logoutHandler,
    onLogin: loginHandler,
    onSignUp: signUpHandler,
    onUserLike: addLikesHandler,
    onUserUnlike: removeLikesHandler,
    user: user,
  }), [isLoggedIn, loginMessage, signupMessage, logoutHandler, loginHandler, signUpHandler, addLikesHandler, removeLikesHandler, user]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsersContext() {
  return useContext(UsersContext);
}

export {
  UsersContextProvider,
  useUsersContext,
};




// ...........................................................................................