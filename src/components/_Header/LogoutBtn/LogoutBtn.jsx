import { memo } from 'react'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'

const LogoutBtn = ({ onLogout }) => {
  return (
    <Button type='link' onClick={onLogout}>
      logout
      <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  )
}

export default memo(LogoutBtn)
