import {Outlet} from "react-router-dom";

export default function AuthLayout () {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}