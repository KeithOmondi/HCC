import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllAgents from '../components/Admin/AllAgents'

const AdminDashboardAgents = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllAgents />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardAgents