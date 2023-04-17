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
    park: noPark,
    parks: [],
    userLike: false,
    totalLikes: 0,
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
      .addCase(userParks.pending, (state, action) => {})
      .addCase(userParks.fulfilled, (state, action) => {
        state.parks = action.payload;
      })
      .addCase(userParks.rejected, (state, action) => {
        console.error("userParks: ", action.payload);
      });
  },
});

//GET all parks
export const fetchParks = createAsyncThunk("dogs/fetchParks", async () => {
  //Todo: move to API folder
  const respone = await fetch(`/api/parks`);
  const parksData = await respone.json();
  return parksData;
});

//GET user's park(s)
export const userParks = createAsyncThunk("dogs/userParks", async (id) => {
  //Todo: move to API folder
  const respone = await fetch(`/api/users/${id}/parks`);
  const parksData = await respone.json();
  return parksData;
});


export const {} = parksSlice.actions;

export default parksSlice.reducer;
