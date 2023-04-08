import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user-slice'

export default configureStore({
  reducer: {
    user: userSlice,
  }
})