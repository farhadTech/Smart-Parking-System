import { Link, Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/oauth/callback";

  return (
    <div className="min-h-screen bg-slate-950">
      { !hideNavbar && (
        <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-10 py-4 shadow">
          <h1 className="text-2xl font-bold text-blue-500">Smart Parking</h1>

          <div className="space-x-6">
            <Link
              to="/"
              className="font-medium text-slate-200 hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="font-medium text-slate-200 hover:text-blue-400"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="font-medium text-slate-200 hover:text-blue-400"
            >
              Register
            </Link>
          </div>
        </nav>
      ) }

      <Outlet />
    </div>
  );
};

export default PublicLayout;
