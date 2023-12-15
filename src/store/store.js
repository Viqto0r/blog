import { configureStore } from '@reduxjs/toolkit'
import authData from './slices/authSlice'
import allUsersInDB from './slices/allUsersInDBSlice'

export const store = configureStore({
  reducer: {
    authData,
    allUsersInDB,
  },
})
