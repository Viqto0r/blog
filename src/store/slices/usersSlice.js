import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db, getCollection } from '../../api/firebaseApi'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth'

export const getAllUsers = createAsyncThunk('users/getAllUsers', () =>
  getCollection('users')
)

export const changeUserData = createAsyncThunk(
  'users/changeUserData',
  async ({ uid, newData, currentUser = null }, { getState }) => {
    const docRef = doc(db, 'users', uid)

    if (currentUser && newData.password) {
      await updatePassword(currentUser, newData.password)
    }

    //if (currentUser && !newData.password) {
    //  newData.password = getState().currentUser.userData.password
    //}

    await updateDoc(docRef, newData)

    const docSnap = await getDoc(docRef)

    return { user: docSnap.data(), newData }
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
      .addCase(changeUserData.pending, fetchStartHandler)
      .addCase(changeUserData.rejected, errorHandler)
      .addCase(
        changeUserData.fulfilled,
        (state, { payload: { user, newData } }) => {
          state.isLoading = false
          state.users = state.users.map((u) => {
            return u.email === user.email ? { ...u, ...newData } : u
          })
        }
      )

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
