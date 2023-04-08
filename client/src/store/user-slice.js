import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const noUser = {
  _id: "",
  name: "",
  email: "",
  city: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    loginMessage: false,
    signupMessage: false,
    user: noUser,
  },
  reducers: {
    logout: (state) => {
      //maybe update DB
      state.isLoggedIn = false;
      state.user = noUser;
    },
    setMessage: (state) => {
      state.loginMessage = true;
      state.signupMessage = true;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoggedIn = false;
      state.loginMessage = false;
    }).addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; //userData
    }).addCase(login.rejected, (state, action) => {
      state.loginMessage = true;
      console.error("login: ", action.payload);
    }).addCase(signUp.pending, (state, action) => {
      state.isLoggedIn = false;
      state.signupMessage = false;
    }).addCase(signUp.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; //userData
    }).addCase(signUp.rejected, (state, action) => {
      // state.signupMessage = true;
      console.error("signUp: ", action.payload);
    })
  }
});

export const login = createAsyncThunk("user/login", async ({ email, password }) => {
  //Todo: move to API folder (to user-actions?)
  const respone = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const userData = await respone.json();
  return userData;
});
export const signUp = createAsyncThunk("user/signUp", async ({ name, email, city, password }) => {
  //Todo: move to API folder (to user-actions?)
  const respone = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, city, password }),
  });

  const userData = await respone.json();
  return userData;
});

export const { logout, setMessage } = userSlice.actions;

export default userSlice.reducer;
