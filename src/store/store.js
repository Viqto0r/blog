import { configureStore } from '@reduxjs/toolkit'
import currentUser from './slices/currentUserSlice'
import allUsersInDB from './slices/allUsersInDBSlice'

export const store = configureStore({
  reducer: {
    currentUser,
    allUsersInDB,
  },
})
