import { memo } from 'react'
import { Header } from 'antd/es/layout/layout'

import Logo from '../Logo/Logo'

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
}

const _Header = ({ children }) => {
  return (
    <Header style={headerStyle}>
      <Logo />
      {children}
    </Header>
  )
}

export default memo(_Header)
