import { memo, useState } from 'react'
import { Layout } from 'antd'

import _Header from '../../components/_Header/_Header'
import UserPageHeader from '../../components/_Header/UserPageHeader/UserPageHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import Main from '../../components/Main/Main'
import UserPageMain from '../../components/Main/UserPageMain/UserPageMain'
import _Footer from '../../components/_Footer/_Footer'
import _Modal from '../../components/_Modal/_Modal'

import { userPageMenuOptions } from '../../components/Sidebar/Sidebar-config'

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh',
}

const UserPage = () => {
  const [showForm, setShowForm] = useState(null)

  //formType: login | registration | null - если нужно скрыть форму
  const showFormHandler = (formType) => setShowForm(formType)
  const hideFormsHandler = () => setShowForm(null)

  return (
    <>
      <Layout style={layoutStyle}>
        <_Header>
          <UserPageHeader onShowForm={showFormHandler} />
        </_Header>
        <Layout>
          <Sidebar menuOptions={userPageMenuOptions} />
          <Main>
            <UserPageMain />
          </Main>
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
