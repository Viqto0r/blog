import { memo } from 'react'
import { faCopyright, faRegistered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from 'antd/es/layout/layout'

const footerStyle = {
  textAlign: 'center',
}

const _Footer = () => {
  return (
    <Footer style={footerStyle}>
      <FontAwesomeIcon icon={faCopyright} />
      <span>License</span>
      <FontAwesomeIcon icon={faRegistered} />
    </Footer>
  )
}

export default memo(_Footer)
