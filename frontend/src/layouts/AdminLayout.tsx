import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { adminNavigation } from "../constants/navigation";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Sidebar items={ adminNavigation } />

      <main className="min-h-screen pb-24 md:ml-64 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;