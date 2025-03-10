import React from 'react'
import AllClients from '../components/Admin/AllClients'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminDashboardClients = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <AllClients />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardClients