import { useSelector } from 'react-redux'
import { useCallback, useEffect, useRef, useState } from 'react'

import Header from './components/Header/'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main'
import _Modal from './components/_Modal/_Modal'

import { createUserFB } from './api/firebaseApi'
import styles from './App.module.scss'
import useAuth from './hooks/useAuth'

function App() {
  const [showForm, setShowForm] = useState(null)
  const newUserDataRef = useRef(null)
  const currentUser = useSelector((state) => state.currentUser)
  const { authHandler, loginHandler, logoutHandler } = useAuth()

  useEffect(() => {
    authHandler(newUserDataRef.current, hideFormsHandler)
  }, [])

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

  return (
    <>
      <div className={styles.wrapper}>
        <Header
          loggined={currentUser.role !== 'guest'}
          onShowForm={showFormHandler}
          onLogout={logoutHandler}
        />
        <Sidebar />
        <Main />
        <Footer />
      </div>

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

export default App
