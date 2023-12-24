import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import { convertEmailToNickname } from '../../utils/utils'
import UserProfileForm from '../forms/UserProfileForm/UserProfileForm'
import useProfileSettings from '../../hooks/useProfileSettings'

const UserProfileMenu = () => {
  const dispatch = useDispatch()
  const { email, role } = useSelector((state) => state.authData.currentUser)
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
            {convertEmailToNickname(email)}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <UserProfileForm
        open={showProfileSettings}
        onClose={toggleProfileSettings}
      />
    </>
  )
}

export default memo(UserProfileMenu)
