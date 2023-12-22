import { configureStore } from '@reduxjs/toolkit'
import authData from './slices/authSlice'
import usersData from './slices/usersSlice'

export const store = configureStore({
  reducer: {
    authData,
    usersData,
  },
})
