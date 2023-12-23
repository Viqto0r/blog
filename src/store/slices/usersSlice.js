import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db, getCollection } from '../../api/firebaseApi'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

export const getAllUsers = createAsyncThunk('users/getAllUsers', () =>
  getCollection('users')
)

export const changeUserRole = createAsyncThunk(
  'users/changeUserRole',
  async ({ uid, role }) => {
    const docRef = doc(db, 'users', uid)

    await updateDoc(docRef, { role })

    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }
)

export const deleteUser = createAsyncThunk('users/deleteUser', async (uid) => {
  const docRef = doc(db, 'users', uid)
  await deleteDoc(docRef)

  return uid
})

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
        state.isLoading = false
        state.users = payload
      })

    builder
      .addCase(changeUserRole.pending, fetchStartHandler)
      .addCase(changeUserRole.rejected, errorHandler)
      .addCase(changeUserRole.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.users = state.users.map((user) => {
          if (user.email === payload.email) {
            user.role = payload.role
          }
          return user
        })
      })

    builder
      .addCase(deleteUser.pending, fetchStartHandler)
      .addCase(deleteUser.rejected, errorHandler)
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false

        state.users = state.users.filter((user) => user.uid !== payload)
      })
  },
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
