import React, { memo } from 'react'
import { Content } from 'antd/es/layout/layout'

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  overflowY: 'auto',
}

const Main = ({ children }) => {
  return <Content style={contentStyle}>{children}</Content>
}

export default memo(Main)
