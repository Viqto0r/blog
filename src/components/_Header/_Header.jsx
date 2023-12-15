import { memo } from 'react'
import { Header } from 'antd/es/layout/layout'

import Logo from '../Logo/Logo'
import LoginBtn from './LoginBtn/LoginBtn'
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
}

const _Header = ({ onShowForm }) => {
  const {
    isLoading,
    currentUser: { role },
  } = useSelector((state) => state.authData)

  const userProfileBtn =
    role === 'guest' ? (
      <LoginBtn showLoginForm={() => onShowForm('login')} />
    ) : (
      <UserProfileMenu />
    )

  return (
    <Header style={headerStyle}>
      <Logo />
      {isLoading ? <Spin /> : userProfileBtn}
    </Header>
  )
}

export default memo(_Header)
