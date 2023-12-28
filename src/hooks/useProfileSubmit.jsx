import { useDispatch } from 'react-redux'
import { changeUserData } from '../store/slices/usersSlice'
import { changeCurrentUserData } from '../store/slices/currentUserSlice'
import { auth } from '../api/firebaseApi'

const getFile = ({ fileList }) => fileList[0]?.originFileObj || ''
// Сделать сброс форм при закрытии модальных
const useProfileSubmit = (setValue, setError) => {
  const dispatch = useDispatch()

  const resetPassFieldsHandler = () => {
    setValue('password', '')
    setValue('oldPassword', '')
    setValue('confirm', '')
  }

  const submitProfileHandler = async ({
    confirm: _,
    oldPassword: __,
    password,
    avatar: avatarFromForm,
    ...otherData
  }) => {
    try {
      const { uid } = auth.currentUser
      const avatar = getFile(avatarFromForm)
      const newData = { ...otherData, avatar }
      if (password) {
        newData.password = password
      }

      await dispatch(
        changeUserData({
          uid,
          newData,
          currentUser: auth.currentUser,
        })
      ).unwrap()

      dispatch(changeCurrentUserData(newData))

      resetPassFieldsHandler()
    } catch (e) {
      console.log(e)
      setError('changeProfile', {
        type: 'changeProfile',
        message: 'Ops...Something went wrong try again',
      })
    }
  }

  return submitProfileHandler
}

export default useProfileSubmit
