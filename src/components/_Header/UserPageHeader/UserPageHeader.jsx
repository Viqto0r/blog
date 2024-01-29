import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

import UserProfileMenu from '../../UserProfileMenu/UserProfileMenu'
import LoginBtn from '../LoginBtn/LoginBtn'
import { getCurrentUserSelector } from '../../../store/slices/currentUserSlice'

const UserPageHeader = ({ onShowForm }) => {
  const { role } = useSelector(getCurrentUserSelector)
  const isLoading = useSelector((state) => state.currentUser.isLoading)

  const userProfileBtn =
    role === 'guest' ? (
      <LoginBtn showLoginForm={() => onShowForm('login')} />
    ) : (
      <UserProfileMenu />
    )

  return <>{isLoading ? <Spin /> : userProfileBtn}</>
}

export default memo(UserPageHeader)
