import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  console.log("ProtectedRoutes -> user:", user);
  console.log("ProtectedRoutes -> isAuthenticated:", isAuthenticated);

  if (isAuthenticated === undefined || user === undefined) {
    return (
      <div className="text-center py-20 text-lg text-[#A0A0A0]">
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
