import { memo, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'

import useAuth from '../../hooks/useAuth'

import Main from '../../components/Main/Main'
import _Header from '../../components/_Header/_Header'
import _Footer from '../../components/_Footer/_Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import _Modal from '../../components/_Modal/_Modal'

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh',
}

const UserPage = () => {
  const [showForm, setShowForm] = useState(null)
  const currentUser = useSelector((state) => state.currentUser)
  const { authHandler } = useAuth()

  useEffect(() => {
    authHandler()
  }, [])

  //formType: login | registration | null - если нужно скрыть форму
  const showFormHandler = (formType) => setShowForm(formType)
  const hideFormsHandler = () => setShowForm(null)

  return (
    <>
      <Layout style={layoutStyle}>
        <_Header
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
        showFormHandler={showFormHandler}
        onHideForms={hideFormsHandler}
      />
    </>
  )
}

export default memo(UserPage)
