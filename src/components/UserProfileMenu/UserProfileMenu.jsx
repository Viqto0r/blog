import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { logout } from '../../store/slices/currentUserSlice'
import useProfileSettings from '../../hooks/useProfileSettings'
import UserProfilePanel from '../UserProfilePanel/UserProfilePanel'
import UserAvatar from '../UserAvatar/UserAvatar'

const UserProfileMenu = () => {
  const dispatch = useDispatch()
  const { email, role, avatar } = useSelector((state) => state.currentUser.data)
  const { showProfileSettings, toggleProfileSettings } = useProfileSettings()

  const logoutHandler = async () => {
    dispatch(logout())
  }

  let adminPanelBtn = {}

  if (role === 'admin') {
    adminPanelBtn = {
      key: '2',
      label: <Link to='/admin'>Admin panel</Link>,
    }
  }

  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: 'Settings',
              onClick: toggleProfileSettings,
            },
            adminPanelBtn,
            {
              key: '3',
              danger: true,
              label: 'Logout',
              onClick: logoutHandler,
            },
          ],
        }}
      >
        <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
          <Space>
            <UserAvatar role={role} size='large' src={avatar} email={email} />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <UserProfilePanel
        open={showProfileSettings}
        onClose={toggleProfileSettings}
      />
    </>
  )
}

export default memo(UserProfileMenu)
