import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  // Get admin authentication token from Redux
  const adminToken = useSelector((state) => state?.admin?.adminToken);

  console.log("🛠️ Stored Admin Token:", adminToken);


  // Redirect to login if no token
  if (!adminToken) {
    console.warn("❌ No admin token found. Redirecting to login.");
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
