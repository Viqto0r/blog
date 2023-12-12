import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faBlog} color='#1677ff' fontSize='40px' />
    </div>
  )
}

export default memo(Logo)
