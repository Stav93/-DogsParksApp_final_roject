import React, { useState, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"


const UsersContext = React.createContext({});

const UsersContextProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(false)
  const [user, setUser] = useState({});
  const clickLogInHandler = useNavigate();
  const clickLogOutHandler = useNavigate();

  const loginHandler = async (email, password) => {
    // לשלוח את השם והסיסמא לסרבר ולבדוק אם יש יוזר עם הסיסמא והמייל
    // אם כן הוא מחזיר אותו
    try {
      const respone = await fetch("/api/users/",  
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
        localStorage.setItem("isLoggedIn","1");
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
        const respone = await fetch("/api/users/",  
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
          localStorage.setItem("isLoggedIn","1");
          setIsLoggedIn(true);
          setUser(userData);
          clickLogInHandler("/profile")
        }}
        catch (error) {
<<<<<<< HEAD
          //  setMessage(true);
           console.log("Error: " + error)
=======
           setMessage(true);
            console.log("Error: " + error)
>>>>>>> 0b6ac4d4907d78e3a4e92aa3a00d4c11b3355104
         } 
     } 
    ;

    const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      clickLogOutHandler("/")
    }

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

// אם היוזר עשה לוג אין או סיין אפ אז להפוך לטרו
// useEffect(() => {
//   const storedUserLoggedInInformaition = localStorage.getItem('isLoggedIn')

//   if (storedUserLoggedInInformaition === "1") {
//     setIsLoggedIn(true);
//   }
// },[])