import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { items } from './UserProfileMenu-config'
import { Link } from 'react-router-dom'

const UserProfile = ({ onLogout }) => {
  const { nickname, email, role } = useSelector((state) => state.currentUser)

  let adminPanel = {}

  if (role === 'admin') {
    adminPanel = {
      key: '2',
      label: <Link to='/admin'>Admin panel</Link>,
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
    </>
  )
}

export default memo(UserProfile)
