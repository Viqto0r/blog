import { Avatar, Space } from 'antd'
import { convertEmailToNickname } from '../../utils/utils'
import { memo } from 'react'
import useImgSrc from '../../hooks/useImgSrc'

const UserAvatar = ({ role = null, email, src, size = 'default' }) => {
  const [avatarSrc] = useImgSrc(src)

  return (
    <Space>
      <Avatar children={role} size={size} src={avatarSrc} />
      {convertEmailToNickname(email)}
    </Space>
  )
}

export default memo(UserAvatar)
