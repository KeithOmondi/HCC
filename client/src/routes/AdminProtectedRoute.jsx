import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
//   const { adminToken } = useSelector((state) => state?.admin || {});
// console.log("admin", adminToken)
  // Check if admin is authenticated
  // if (!adminToken) {
  //   return <Navigate to="/admin-login" replace />;
  // }else


  // return <Outlet />;
};

export default AdminProtectedRoute;
