import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user-slice'
import dogsSlice from "./dogs-slice"
import parksSlice from "./parks-slice"

export default configureStore({
  reducer: {
    user: userSlice,
    dogs: dogsSlice,
    parks: parksSlice,
  }
})