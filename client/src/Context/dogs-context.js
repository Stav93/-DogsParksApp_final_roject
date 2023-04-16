import React, { useMemo, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUsersContext } from "../Context/user-context";
// import { useHttpData } from "../hooks/use-http";

const DogsContext = React.createContext({});

const DogsContextProvider = ({ children }) => {
  const userId = useSelector((state) => state.user.user._id);
  console.log(userId);
  // const dispatch = useDispatch();

  const usersCtx = useUsersContext();
  const [showForm, setShowForm] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState("");
  const [editing, setEditing] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  // const { data: dogs } = useHttpData({
  //   url: `/api/users/${usersCtx.user._id}/dogs`,
  // });

  //fetch user's dogs
  useEffect(() => {
    // console.log(user);
    // console.log("id " + userId);
    if (!userId) {
      return;
    }
    fetch(`/api/users/${userId}/dogs`)
      .then((response) => response.json())
      .then((data) => setDogs(data))
      .then(console.log(dogs));
  }, [userId]);

  //add the dogs to the array, show in the UI and then write to DB
  const addDogFunc = async (
    name,
    year_of_birth,
    weight,
    likes,
    dislike,
    owner
  ) => {
    // setDogs([
    //   { name, year_of_birth, weight, likes, dislike, owner, _id: "" },
    //   ...dogs,
    // ]);
    try {
      const respone = await fetch("/api/dogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          year_of_birth,
          weight,
          likes,
          dislike,
          owner,
        }),
      });
      const dogsNewDB = await respone.json();
      const dogsNew = [dogsNewDB, ...dogs];
      setDogs(dogsNew);
    } catch (error) {
      // remove added dog
      dogs.shift();
      // setDogs(dogs);
      console.log("Error: " + error);
      //add a message to the user?
    }
  };

  const hidePopUp = () => {
    setShowDeletePopUp(false);
  };

  const showPopUp = () => {
    setShowDeletePopUp(true);
  };

  // show delete pop-up
  const deletePopUpHandler = () => {
    showPopUp();
  };

  // בזמן הפופ אפ - הכלב שאנחנו רוצים למחוק
  const deleteDogHandler = ({
    _id,
    name,
    year_of_birth,
    weight,
    likes,
    dislike,
  }) => {
    showPopUp();
    setDog({ _id, name, year_of_birth, weight, likes, dislike });
  };

  // בלחיצה על מחיקה בתוך הפופאפ
  // const deleteDogFinal = async () => {
  //   console.log(dog);
  //   const id = dog._id;
  //   setShowDeletePopUp(false);
  //   try {
  //     const respone = await fetch(`/api/dogs/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id }),
  //     });
  //     setDogs((prev) => prev.filter((dog) => dog._id !== id));
  //     console.log(dogs);
  //   } catch (error) {
  //     console.log("Error: " + error);
  //   }
  // };

  const AddADogHandler = () => {
    setShowForm(true);
  };

  const hideFormFunc = () => {
    setShowForm(false);
    setEditing(false);
  };

  const EditDogFunc = (dog) => {
    setShowForm(true);
    setDog(dog);
    setEditing(true);
    console.log(dog);
  };

  const saveDogsAfterEdit = (dogs) => {
    setDogs(dogs);
  };

  const value = useMemo(
    () => ({
      dogs,
      showForm,
      addDogFunc,
      AddADogHandler,
      deletePopUpHandler,
      showDeletePopUp,
      hidePopUp,
      deleteDogHandler,
      // deleteDogFinal,
      hideFormFunc,
      EditDogFunc,
      saveDogsAfterEdit,
      dog,
      editing,
    }),
    [
      dogs,
      showForm,
      addDogFunc,
      AddADogHandler,
      deletePopUpHandler,
      // deleteDogFinal,
      showDeletePopUp,
      hidePopUp,
      deleteDogHandler,
      hideFormFunc,
      EditDogFunc,
      saveDogsAfterEdit,
      dog,
      editing,
    ]
  );

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
};

function useDogsContext() {
  return useContext(DogsContext);
}

export { DogsContextProvider, useDogsContext };
