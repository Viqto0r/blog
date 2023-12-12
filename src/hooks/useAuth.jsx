import { useDispatch } from 'react-redux'
import { auth, getDataFromDB } from '../api/firebaseApi'
import { loginUser, logoutUser } from '../store/slices/currentUserSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useCallback } from 'react'

const useAuth = () => {
  const dispatch = useDispatch()

  const authHandler = useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log('Юзер заходит')
      if (!user) {
        console.log('logout')
        dispatch(logoutUser())
        return false
      }
      try {
        const userDataFromDB = await getDataFromDB('users', user.uid)
        dispatch(loginUser({ ...userDataFromDB }))
        return true
      } catch (e) {
        console.log('Ошибка аутентификации')
        return false
      }
    }),
      [dispatch, logoutUser, loginUser]
  })

  return {
    authHandler,
  }
}

export default useAuth
