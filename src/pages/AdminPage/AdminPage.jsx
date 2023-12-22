import { memo } from 'react'
import { Layout, Spin } from 'antd'
import { useSelector } from 'react-redux'

import Sidebar from '../../components/Sidebar/Sidebar'
import AdminPageMain from '../../components/Main/AdminPageMain/AdminPageMain'
import Main from '../../components/Main/Main'
import _Header from '../../components/_Header/_Header'

import { adminPageMenuOptions } from '../../components/Sidebar/Sidebar-config'
import AdminPageHeader from '../../components/_Header/AdminPageHeader/AdminPageHeader'

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: '100vh',
}

const AdminPage = () => {
  const {
    currentUser: { role },
    isLoading,
  } = useSelector((state) => state.authData)

  if (isLoading) return <Spin fullscreen />

  if (role !== 'admin') return <h1>Page Not found</h1>
  return (
    <Layout style={layoutStyle}>
      <_Header>
        <AdminPageHeader />
      </_Header>
      <Layout>
        <Sidebar menuOptions={adminPageMenuOptions}></Sidebar>
        <Main>
          <AdminPageMain />
        </Main>
      </Layout>
    </Layout>
  )
}

export default memo(AdminPage)
