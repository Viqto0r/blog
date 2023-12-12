import { memo } from 'react'
import Modal from 'antd/es/modal/Modal'

import LoginForm from '../forms/LoginForm/LoginForm'
import RegistrationForm from '../forms/RegistrationForm/RegistrationForm'

import { capitalize } from '../../utils/utils'

const _Modal = ({ showForm, showFormHandler, onHideForms }) => {
  return (
    <Modal
      title={capitalize(showForm)}
      open={showForm !== null}
      onCancel={onHideForms}
      footer={null}
    >
      {showForm === 'login' && (
        <LoginForm onShowForm={showFormHandler} onHideForms={onHideForms} />
      )}
      {showForm === 'registration' && (
        <RegistrationForm onHideForms={onHideForms} />
      )}
    </Modal>
  )
}

export default memo(_Modal)
