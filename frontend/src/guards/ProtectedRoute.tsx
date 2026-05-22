import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if ( isLoading ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if ( !isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;