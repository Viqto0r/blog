import { useDispatch } from 'react-redux'
import { changeUserData } from '../store/slices/usersSlice'
import { changeCurrentUserData } from '../store/slices/currentUserSlice'
import { auth } from '../api/firebaseApi'

const useProfileSubmit = (setValue, setError) => {
  const dispatch = useDispatch()

  const resetPassFieldsHandler = () => {
    setValue('password', '')
    setValue('oldPassword', '')
    setValue('confirm', '')
  }

  const submitHandler = async ({
    confirm: _,
    oldPassword: __,
    password,
    ...otherData
  }) => {
    try {
      const newData = { ...otherData }
      if (password) {
        newData.password = password
      }

      await dispatch(
        changeUserData({
          uid: auth.currentUser.uid,
          newData,
          currentUser: auth.currentUser,
        })
      ).unwrap()
      dispatch(changeCurrentUserData(newData))

      resetPassFieldsHandler()
    } catch (e) {
      setError('changeProfile', {
        type: 'changeProfile',
        message: 'Ops...Something went wrong try again',
      })
    }
  }

  return submitHandler
}

export default useProfileSubmit
