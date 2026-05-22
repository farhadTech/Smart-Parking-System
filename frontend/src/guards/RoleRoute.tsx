import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import type { UserRole } from "../types/auth.types";

type RoleRouteProps = {
  allowedRoles: UserRole[];
};

const RoleRoute = ( { allowedRoles }: RoleRouteProps ) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if ( isLoading ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if ( !isAuthenticated || !user ) {
    return <Navigate to="/login" replace />;
  }

  if ( !allowedRoles.includes( user.role ) ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;