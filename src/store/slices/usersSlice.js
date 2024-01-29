import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { db, deleteFile, getCollection, sendFile } from '../../api/firebaseApi'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth'
import { errorHandler, fetchStartHandler } from '../helpers'

const changeImageName = (img, uid) => {
  const newName = img.name.replace(/.+(?=\.(png|svg|jpe?g|gif)$)/, uid)
  return new File([img], newName)
}

const changeAvatar = async (newData, uid, { avatar }) => {
  if (newData.avatar) {
    newData.avatar = changeImageName(newData.avatar, uid)
    newData.avatar = await sendFile('avatars', newData.avatar, {
      contentType: 'image/png',
    })
  }
  if (avatar) {
    await deleteFile(avatar)
  }
}

const changePassword = async (currentUser, { password }) => {
  if (currentUser && password) {
    await updatePassword(currentUser, password)
  }
}

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => await getCollection('users')
)

export const changeUserData = createAsyncThunk(
  'users/changeUserData',
  async ({ uid, newData, currentUser = null }, { getState }) => {
    const docRef = doc(db, 'users', uid)

    await changePassword(currentUser, newData)
    await changeAvatar(newData, uid, getState().currentUser.data)
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

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.data = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, fetchStartHandler)
      .addCase(getAllUsers.rejected, errorHandler)
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload
      })

    builder
      .addCase(changeUserData.pending, fetchStartHandler)
      .addCase(changeUserData.rejected, errorHandler)
      .addCase(
        changeUserData.fulfilled,
        (state, { payload: { user, newData } }) => {
          state.isLoading = false
          state.data = state.data.map((u) => {
            return u.email === user.email ? { ...u, ...newData } : u
          })
        }
      )

    builder
      .addCase(deleteUser.pending, fetchStartHandler)
      .addCase(deleteUser.rejected, errorHandler)
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false

        state.data = state.data.filter((user) => user.uid !== payload)
      })
  },
})
export const getAllUsersSelector = createSelector(
  (state) => state.allUsers,
  (state) => state.data
)
export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
