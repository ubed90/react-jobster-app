import React from 'react'
import { LayoutWrapper } from '../../assets/wrappers'
import { BigSidebar, Navbar, SmallSidebar } from '../../components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <LayoutWrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}

export default Layout
