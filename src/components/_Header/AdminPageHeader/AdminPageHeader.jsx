import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const styles = { color: '#1677ff', fontSize: '30px', cursor: 'pointer' }

const AdminPageHeader = () => {
  const navigate = useNavigate()

  const handleClick = () => navigate(-1)

  return <FontAwesomeIcon icon={faXmark} style={styles} onClick={handleClick} />
}

export default memo(AdminPageHeader)
