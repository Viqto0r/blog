import { memo } from 'react'
import { Header } from 'antd/es/layout/layout'

import Logo from '../Logo/Logo'
import LoginBtn from './LoginBtn/LoginBtn'
import UserProfileMenu from '../UserProfileMenu/UserProfileMenu'

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

const _Header = ({ loggined = false, onShowForm, onLogout }) => {
  return (
    <Header style={headerStyle}>
      <Logo />
      {loggined ? (
        <UserProfileMenu onLogout={onLogout} />
      ) : (
        <LoginBtn showLoginForm={() => onShowForm('login')} />
      )}
    </Header>
  )
}

export default memo(_Header)
