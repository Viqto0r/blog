import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { items } from './UserProfileMenu-config'
import { Link } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'

const UserProfileMenu = () => {
  const dispatch = useDispatch()
  const { nickname, email, role } = useSelector(
    (state) => state.authData.currentUser
  )

  const logoutHandler = async () => {
    dispatch(logout())
  }

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
              onClick: logoutHandler,
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

export default memo(UserProfileMenu)
