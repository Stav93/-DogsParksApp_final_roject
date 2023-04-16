import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user-slice'
import dogsSlice from "./dogs-slice"

export default configureStore({
  reducer: {
    user: userSlice,
    dogs: dogsSlice,
  }
})