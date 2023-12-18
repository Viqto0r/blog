import { Typography } from 'antd'
import { memo } from 'react'

const ErrorMessage = ({ errorMessage }) => {
  return <Typography.Text type='danger'>{errorMessage}</Typography.Text>
}

export default memo(ErrorMessage)
