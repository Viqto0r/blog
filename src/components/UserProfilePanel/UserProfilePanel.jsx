import { Drawer } from 'antd'
import { memo } from 'react'

import UserProfileForm from '../forms/UserProfileForm/UserProfileForm'

const UserProfilePanel = ({ open, onClose }) => {
  return (
    <Drawer
      title={`Change profile settings`}
      placement='right'
      size='large'
      onClose={onClose}
      open={open}
    >
      <UserProfileForm />
    </Drawer>
  )
}

export default memo(UserProfilePanel)
