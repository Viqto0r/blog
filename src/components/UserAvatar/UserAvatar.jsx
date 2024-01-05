import { Avatar, Space } from 'antd'
import { convertEmailToNickname } from '../../utils/utils'
import { memo } from 'react'

const UserAvatar = ({ role = null, email, src, size = 'default' }) => {
  return (
    <Space>
      <Avatar children={role} size={size} src={src} />
      {convertEmailToNickname(email)}
    </Space>
  )
}

export default memo(UserAvatar)
