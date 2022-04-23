import React, {useMemo , useContext, useState, useEffect} from 'react';
import { useUsersContext } from "../Context/user-context"

const DogsContext = React.createContext({});

const DogsContextProvider = ({children}) => {
  const usersCtx = useUsersContext();
  const [showForm, setShowForm] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState("")
  const [editing, setEditing] = useState(false);

     //להביא את הכלבים של היוזר
      useEffect(() => {
      fetch(`/api/dogs/users/${usersCtx.user._id}`)
      .then(response => response.json())
      .then(data => setDogs(data));
      }, []);

      // useEffect(() => {
      // fetch(`/api/dogs/users/622cf265ec0d6b987dd8405a`)
      // .then(response => response.json())
      // .then(data => setDogs(data));
      // }, []);

      const AddADogHandler = () => {
        setShowForm(true);
      }
      
      const hideFormFunc = () => {
        setShowForm(false);
        setEditing(false);
      }
    
      const EditDogFunc = (dog) => {
        setShowForm(true);
        setDog(dog);
        setEditing(true);
        console.log(dog)
      }

    const value = useMemo(() => ({
      dogs,
      showForm,
      AddADogHandler,
      hideFormFunc,
      EditDogFunc,
      dog,
      editing,
    }), [dogs, showForm, AddADogHandler, hideFormFunc, EditDogFunc, dog, editing]);
      

    return (
      <DogsContext.Provider value={value}>
        {children}
        {console.log(`/api/dogs/users/${usersCtx.user._id}`)}
      </DogsContext.Provider>
    );
  }

  function useDogsContext() {
    return useContext(DogsContext);
  }

  export {
    DogsContextProvider,
    useDogsContext,
  };