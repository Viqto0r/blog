import { memo } from 'react'
import { Button } from 'antd'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoginBtn = ({ showLoginForm }) => {
  return (
    <Button type='link' onClick={showLoginForm}>
      login
      <FontAwesomeIcon icon={faRightToBracket} />
    </Button>
  )
}

export default memo(LoginBtn)
