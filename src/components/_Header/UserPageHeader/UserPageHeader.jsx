import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

import UserProfileMenu from '../../UserProfileMenu/UserProfileMenu'
import LoginBtn from '../LoginBtn/LoginBtn'

const UserPageHeader = ({ onShowForm }) => {
  const {
    isLoading,
    userData: { role },
  } = useSelector((state) => state.currentUser)

  const userProfileBtn =
    role === 'guest' ? (
      <LoginBtn showLoginForm={() => onShowForm('login')} />
    ) : (
      <UserProfileMenu />
    )

  return <>{isLoading ? <Spin /> : userProfileBtn}</>
}

export default memo(UserPageHeader)
