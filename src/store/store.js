import { configureStore } from '@reduxjs/toolkit'
import currentUser from './slices/currentUserSlice'
import usersData from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    currentUser,
    usersData,
  },
})
