import { memo } from 'react'
import { Menu } from 'antd'

import Sider from 'antd/es/layout/Sider'
import { data } from './Sidebar-config'

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#FFFFFF',
  width: '10%',
}

const Sidebar = () => {
  return (
    <Sider style={siderStyle}>
      <Menu items={data} defaultSelectedKeys={'1'} mode='vertical' />
    </Sider>
  )
}

export default memo(Sidebar)
