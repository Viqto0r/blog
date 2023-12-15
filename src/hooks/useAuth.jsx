import { useDispatch } from 'react-redux'
import { auth } from '../api/firebaseApi'
import { getCurrentUser } from '../store/slices/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useCallback } from 'react'

const useAuth = () => {
  const dispatch = useDispatch()

  const authHandler = useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log('Юзер заходит')
      if (!user) {
        console.log('Юзер не авторизован')
        return false
      }
      console.log('Установка данных юзера в стейт')
      dispatch(getCurrentUser({ key: 'users', id: user.uid }))
      console.log('Юзер авторизован, данные в стейт установлены')
      return user
    }),
      [dispatch, getCurrentUser]
  })

  return {
    authHandler,
  }
}

export default useAuth
