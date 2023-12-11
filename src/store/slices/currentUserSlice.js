import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  role: 'guest',
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    loginUser: (_, { payload }) => {
      return payload
    },
    logoutUser: () => {
      return initialState
    },
  },
})

export const { loginUser, logoutUser } = currentUserSlice.actions

export default currentUserSlice.reducer
