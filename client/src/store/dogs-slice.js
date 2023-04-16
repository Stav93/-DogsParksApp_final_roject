import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userSlice } from "./user-slice"

const noDog = {
  _id: "",
  name: "",
  year_of_birth: "",
  weight: "",
  dislike: "",
  userId: "",
};



export const dogsSlice = createSlice({
  name: "dogs",
  initialState: {
    dogs: [],
    dog: noDog,
    showForm: false,
    editing: false,
    showDeletePopUp: false,

  },
  reducers: {
    showDeleteDogPopUp: (state, action) => {
      state.showDeletePopUp = true;
      state.dog = action.payload;
    },
    hideDeleteDogPopUp: (state) => {
      state.showDeletePopUp = false;
    },
    // show delete pop-up
    //check if needed
    // deletePopUpHandler: (state) => {
    //   state.showDeletePopUp = false;
    // },
    //while the popup is visible - the dog we want to delete
    // deleteDogHandler: (state, action) => {
    //   state.dog = action.payload;
    //   state.showDeletePopUp = true;
    // },
    //clicking on the "add dog" button in the dog list page
    addDogBtn: (state) => {
      state.showForm = true;
    },
    editDog: (state, action) => {
      state.dog = action.payload;
      state.showForm = true;
      state.editing = true;
    },
    hideForm: (state) => {
      state.showForm = false;
      state.editing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //get user's dog(s)
      .addCase(fetchDogs.pending, (state, action) => {})
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.dogs = action.payload;
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        console.error("fetchDogs: ", action.payload);
      })
      //add a dog
      .addCase(addDogtoDB.pending, (state, action) => {})
      .addCase(addDogtoDB.fulfilled, (state, action) => {
        state.dog = action.payload;
        state.dogs = [...state.dogs, state.dog];
      })
      .addCase(addDogtoDB.rejected, (state, action) => {
        console.error("addDogtoDB: ", action.payload);
      })
      //delete a dog
      .addCase(deleteDog.pending, (state, action) => {})
      .addCase(deleteDog.fulfilled, (state, action) => {
        state.showDeletePopUp = false;
        state.dog = action.payload;
        state.dogs = state.dogs.filter((d) => d._id !== state.dog._id);
      })
      .addCase(deleteDog.rejected, (state, action) => {
        state.showDeletePopUp = false;
        state.dog = action.payload;
        console.log(state.dog)
        console.error("deleteDog: ", action.payload);
      })
      //edit a dog
      .addCase(saveEditDog.pending, (state, action) => {})
      .addCase(saveEditDog.fulfilled, (state, action) => {
        state.dog = action.payload;
        state.dogs = state.dogs.map(d => d._id === state.dog._id ? state.dog : d)
      })
      .addCase(saveEditDog.rejected, (state, action) => {
        console.error("saveEditDog: ", action.payload);
      });
  },
});

//GET all user's dog(s)
export const fetchDogs = createAsyncThunk("dogs/fetchDogs", async (userId, userLogged) => {
  //Todo: move to API folder
  if (userLogged) {
    const respone = await fetch(`/api/users/${userId}/dogs`);
    const dogsData = await respone.json();
    return dogsData;
  }
});

//ADD NEW DOG
export const addDogtoDB = createAsyncThunk(
  "user/addDogtoDB",
  async ({name, year_of_birth, weight, likes, dislike, owner }) => {
    //Todo: move to API folder
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

    const dogData = await respone.json();
    return dogData;
  }
);

export const saveEditDog = createAsyncThunk(
  "user/saveEditDog",
  async ({ _id, name, year_of_birth, weight, likes, dislike } ) => {
    //Todo: move to API folder
    const respone = await fetch(`/api/dogs/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, year_of_birth, weight, likes, dislike }),
    });

    const editedDog = await respone.json();
    return editedDog;
  }
);

export const deleteDog = createAsyncThunk("user/deleteDog", async ( id ) => {
  //Todo: move to API folder
  const dogId = id._id
  console.log(dogId)
  const respone = await fetch(`/api/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dogId }),
  });

  const deletedDog = await respone.json();
  return deletedDog;
});

export const {
  showDeleteDogPopUp,
  hideDeleteDogPopUp,
  deletePopUpHandler,
  deleteDogHandler,
  addDogBtn,
  editDog,
  hideForm,
} = dogsSlice.actions;

export default dogsSlice.reducer;
