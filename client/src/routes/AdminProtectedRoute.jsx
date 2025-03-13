import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const adminToken = localStorage.getItem("adminToken");

  return adminToken ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoute;
