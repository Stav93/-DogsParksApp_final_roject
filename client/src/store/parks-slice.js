import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const noPark = {
  _id: "",
  name: "",
  city: "",
  street: "",
  users: [],
};

export const parksSlice = createSlice({
  name: "parks",
  initialState: {
    currentPark: undefined,
    parks: [],
    usersParks: [],
    userLike: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //get all parks)
      .addCase(fetchParks.pending, (state, action) => {})
      .addCase(fetchParks.fulfilled, (state, action) => {
        state.parks = action.payload;
      })
      .addCase(fetchParks.rejected, (state, action) => {
        console.error("fetchParks: ", action.payload);
      })
      //GET user's park(s)
      // .addCase(getUserParks.pending, (state, action) => {})
      // .addCase(getUserParks.fulfilled, (state, action) => {
      //   state.usersParks = action.payload;
      // })
      // .addCase(getUserParks.rejected, (state, action) => {
      //   console.error("userParks: ", action.payload);
      // })
      //add like - update park's like(s)
      .addCase(addLike.pending, (state, action) => {})
      .addCase(addLike.fulfilled, (state, action) => {
        const { data, parkId } = action.payload;
        //remove the park from the parks array
        state.parks = state.parks.filter((p) => p._id !== parkId);
        //add the new park to the array
        state.parks = [...state.parks, data];
        // state.currentPark = action.payload;
        state.totalParkLikes++;
      })
      .addCase(addLike.rejected, (state, action) => {
        console.error("addLike: ", action.payload);
      })
      //remove like - update park's like(s)
      .addCase(removeLike.pending, (state, action) => {})
      .addCase(removeLike.fulfilled, (state, action) => {
        //remove the park from usersParks
        // state.usersParks = state.usersParks.filter(
        //   (p) => p._id !== action.payload._id
        // );
        //remove the park from the parks
        state.parks = state.parks.filter((p) => p._id !== action.payload._id);
        //remove the user from the park
        const currentPark = action.payload;
        currentPark.users.filter((users) => users._id !== currentPark._id);
        //update parks
        state.parks = [...state.parks, currentPark];
        state.totalParkLikes--;
      })
      .addCase(removeLike.rejected, (state, action) => {
        console.error("removeLike: ", action.payload);
      });
  },
});
//GET all parks
export const fetchParks = createAsyncThunk("parks/fetchParks", async (id) => {
  //Todo: move to API folder
  if (id !== undefined) {
    //GET user's park(s)
    const respone = await fetch(`/api/users/${id}/parks`);
    const parksData = await respone.json();
    return parksData;
  } else {
    //GET all parks
    const respone = await fetch(`/api/parks`);
    const parksData = await respone.json();
    return parksData;
  }
});

//GET user's park(s)
// export const getUserParks = createAsyncThunk("parks/userParks", async (id) => {
//   //Todo: move to API folder
//   const respone = await fetch(`/api/users/${id}/parks`);
//   const parksData = await respone.json();
//   return parksData;
// });

export const addLike = createAsyncThunk(
  "parks/addLike",
  async ({ userId, parkId }) => {
    console.log(parkId);
    //Todo: move to API folder
    const respone = await fetch(`/api/parks/${parkId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await respone.json();
    return { data, parkId };
  }
);

export const removeLike = createAsyncThunk(
  "parks/removeLike",
  async ({ userId, parkId }) => {
    console.log({ parkId });
    //Todo: move to API folder
    const respone = await fetch(`/api/parks/${parkId}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await respone.json();
    return data;
  }
);

export const { updatePark, updateUserLike, updateParks } = parksSlice.actions;

export default parksSlice.reducer;
