import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { items } from './UserProfile-config'
import AdminPanel from '../AdminPanel'

const UserProfile = ({ onLogout }) => {
  const { nickname, email, role } = useSelector((state) => state.currentUser)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  const toggleAdminPanelHandler = useCallback(() => {
    setShowAdminPanel((visible) => !visible)
  }, [setShowAdminPanel])

  let adminPanel = {}

  if (role === 'admin') {
    adminPanel = {
      key: '2',
      label: 'Admin panel',
      onClick: toggleAdminPanelHandler,
    }
  }

  return (
    <>
      <Dropdown
        menu={{
          items: [
            ...items,
            adminPanel,
            {
              key: '3',
              danger: true,
              label: 'Logout',
              onClick: onLogout,
            },
          ],
        }}
      >
        <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
          <Space>
            {nickname || email}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <AdminPanel
        showAdminPanel={showAdminPanel}
        onToggleAdminPanel={toggleAdminPanelHandler}
      />
    </>
  )
}

export default memo(UserProfile)
