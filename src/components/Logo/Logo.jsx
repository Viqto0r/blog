import styles from './Logo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <FontAwesomeIcon icon={faBlog} fontSize='40px' />
    </div>
  )
}

export default memo(Logo)
