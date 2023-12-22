import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCollection } from '../../api/firebaseApi'

export const getAllUsers = createAsyncThunk('users/registerUser', () =>
  getCollection('users')
)

const fetchStartHandler = (state) => {
  state.isLoading = true
  state.isError = false
  state.errorMessage = ''
}

const errorHandler = (state, { error }) => {
  state.isLoading = false
  state.isError = true
  state.errorMessage = error.message
}

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, fetchStartHandler)
      .addCase(getAllUsers.rejected, errorHandler)
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
        state.users = payload
      })
  },
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
