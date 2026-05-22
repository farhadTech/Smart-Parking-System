import {Outlet} from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Sidebar from "../components/common/Sidebar";

import BottomNavbar from "../components/common/BottomNavbar";

import CommandPalette
  from "../components/common/CommandPalette";

export default function DashboardLayout () {

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-gray-950 flex transition-colors duration-300">

      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        <Navbar />

        <CommandPalette />
        
        <main className="flex-1 p-4 md:p-6 xl:p-8 overflow-y-auto pb-28 xl:pb-8">

          <Outlet />

        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <BottomNavbar />

      </div>

    </div>
  );
}