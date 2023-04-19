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
    totalParkLikes: 0,
  },
  reducers: {
    updatePark: (state, action) => {
      state.park = action.payload
    }
    // addLike: (state) => {
    //   state.userLike = true;
    //   state.totalParkLikes++;
    // },
    // removeLike: (state) => {
    //   state.userLike = false;
    //   state.totalParkLikes--;
    // },
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
      })
      //add like - update park's like(s)
      .addCase(addLike.pending, (state, action) => {})
      .addCase(addLike.fulfilled, (state, action) => {
        state.park = action.payload;
        state.userLike = true;
      })
      .addCase(addLike.rejected, (state, action) => {
        console.error("addLike: ", action.payload);
      })
      //remove like - update park's like(s)
      .addCase(removeLike.pending, (state, action) => {})
      .addCase(removeLike.fulfilled, (state, action) => {
        // state.park = action.payload;
        state.userLike = false;
        state.park = action.payload.data;
        const userId = action.payload.userId;
        // console.log(state.park);
        // console.log(userId)
        console.log(state.park.users)
        // state.park.users.filter(user => user._id !== userId)
      })
      .addCase(removeLike.rejected, (state, action) => {
        console.error("removeLike: ", action.payload);
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

export const addLike = createAsyncThunk("dogs/addLike", async ({ userId, parkId }) => {
  console.log({ parkId } )
  //Todo: move to API folder
  const respone = await fetch(`/api/parks/${parkId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  const data = await respone.json();
  console.log(data)
});

export const removeLike = createAsyncThunk("dogs/removeLike", async ({ userId, parkId }) => {
  console.log({ parkId } )
  //Todo: move to API folder
  const respone = await fetch(`/api/parks/${parkId}/dislike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  const data = await respone.json();
  return { data, userId };
});


export const { updatePark } = parksSlice.actions;

export default parksSlice.reducer;
