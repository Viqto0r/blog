import { memo } from 'react'
import Modal from 'antd/es/modal/Modal'
import LoginForm from '../forms/LoginForm/LoginForm'
import RegistrationForm from '../forms/RegistrationForm/RegistrationForm'
import { capitalize } from '../../utils/utils'

const _Modal = ({
  showForm,
  showFormHandler,
  hideFormsHandler,
  loginHandler,
  registrationHandler,
}) => {
  return (
    <Modal
      title={capitalize(showForm)}
      open={showForm !== null}
      onCancel={hideFormsHandler}
      footer={null}
    >
      {showForm === 'login' && (
        <LoginForm onLogin={loginHandler} onShowForm={showFormHandler} />
      )}
      {showForm === 'registration' && (
        <RegistrationForm onRegistration={registrationHandler} />
      )}
    </Modal>
  )
}

export default memo(_Modal)
