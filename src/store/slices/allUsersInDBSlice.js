import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const allUsersInDBSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload
    },
  },
})

export const { setUsers } = allUsersInDBSlice.actions

export default allUsersInDBSlice.reducer
