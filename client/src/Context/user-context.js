import React, { useState, useContext, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const UsersContext = React.createContext({});

const UsersContextProvider = ({children}) => {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(false)
  const [user, setUser] = useState({});
  const clickLogInHandler = useNavigate();
  const clickLogOutHandler = useNavigate();
  const navigate = useNavigate();


useEffect(() => {
  const storedUserLoggedInInformaition = localStorage.getItem('isLoggedIn');

  if (storedUserLoggedInInformaition !== null) {
    const userData = JSON.parse(storedUserLoggedInInformaition);
    setUser(userData);
    setIsLoggedIn(true);
    navigate(`/profile/${userData.name}`);
  } else {
    navigate('/login');
  }
},[])

  const loginHandler = async (email, password) => {
    // לשלוח את השם והסיסמא לסרבר ולבדוק אם יש יוזר עם הסיסמא והמייל
    // אם כן הוא מחזיר אותו
    try {
      const respone = await fetch("/api/users/login",  
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        }
      );

      const userData = await respone.json();  
      if (userData !== undefined) {
        localStorage.setItem("isLoggedIn",JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        clickLogInHandler(`/profile/${userData.name}`);
      }}
      catch (error) {
         setMessage(true);
        // console.log("Error: " + error)
       } 
   } 

    const signUpHandler = async (name, email, city, password) => {
      try {
        const respone = await fetch("/api/users/signup",  
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, city, password}),
          }
        );
  
        const userData = await respone.json();  
        if (userData !== undefined) {
          localStorage.setItem("isLoggedIn",JSON.stringify(userData));
          setIsLoggedIn(true);
          setUser(userData);
          console.log(userData);
          clickLogInHandler(`/profile/${userData.name}`);
        }}
        catch (error) {
          //  setMessage(true);
           console.log("Error: " + error)
         } 
     } 
    ;

    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      clickLogOutHandler("/login")
    }

    // useEffect(() => {
    //   fetch(`/api/dogs/users/${usersCtx.user._id}`)
    //   .then(response => response.json())
    //   .then(data => setDogs(data));
    //   }, []);

    const value = useMemo(() => ({
      isLoggedIn: isLoggedIn,
      message: message,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      onSignUp: signUpHandler,
      user: user,
    }), [isLoggedIn, message, logoutHandler, loginHandler, signUpHandler, user]);

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