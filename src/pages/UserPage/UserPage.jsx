import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'
import { createUserFB } from '../../api/firebaseApi'

import useAuth from '../../hooks/useAuth'

import Main from '../../components/Main/Main'
import _Header from '../../components/_Header/_Header'
import _Footer from '../../components/_Footer/_Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import _Modal from '../../components/_Modal/_Modal'

const UserPage = () => {
  const [showForm, setShowForm] = useState(null)
  const newUserDataRef = useRef(null)
  const currentUser = useSelector((state) => state.currentUser)
  const { authHandler, loginHandler, logoutHandler } = useAuth()

  useEffect(() => {
    authHandler(newUserDataRef.current, hideFormsHandler)
  }, [authHandler, hideFormsHandler])

  const showFormHandler = useCallback((formType) => {
    //formType: login | registration | null - если нужно скрыть форму
    setShowForm(formType)
  }, [])

  const hideFormsHandler = useCallback(() => {
    setShowForm(null)
  }, [])

  const registrationHandler = useCallback((userData) => {
    const { email, password, agreement, confirm, ...otherData } = userData
    newUserDataRef.current = { email, password, ...otherData, role: 'user' }
    createUserFB(email, password)
  }, [])

  const layoutStyle = {
    overflow: 'hidden',
    height: '100vh',
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <_Header
          onLogout={logoutHandler}
          onShowForm={showFormHandler}
          loggined={currentUser.role !== 'guest'}
        />
        <Layout>
          <Sidebar />
          <Main />
        </Layout>
        <_Footer />
      </Layout>

      <_Modal
        showForm={showForm}
        loginHandler={loginHandler}
        registrationHandler={registrationHandler}
        showFormHandler={showFormHandler}
        hideFormsHandler={hideFormsHandler}
      />
    </>
  )
}

export default memo(UserPage)
