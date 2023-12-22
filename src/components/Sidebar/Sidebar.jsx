import { memo } from 'react'
import { Menu } from 'antd'

import Sider from 'antd/es/layout/Sider'

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  backgroundColor: '#FFFFFF',
  width: '10%',
}

const Sidebar = ({ menuOptions }) => {
  return (
    <Sider style={siderStyle}>
      <Menu items={menuOptions} defaultSelectedKeys={'1'} mode='vertical' />
    </Sider>
  )
}

export default memo(Sidebar)
