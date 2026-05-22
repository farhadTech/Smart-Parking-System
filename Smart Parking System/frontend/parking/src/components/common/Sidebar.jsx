import {
  LayoutDashboard,
  CarFront,
  CalendarDays,
  ShieldAlert,
  LogOut,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useState,
} from "react";

export default function Sidebar ({
  mobile,
  closeSidebar,
}) {
  const {user} = useAuth();

  const [collapsed, setCollapsed] =
    useState(false);

  const userMenus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      title: "Book Parking",
      icon: <CarFront size={20} />,
      path: "/parking-slots",
    },

    {
      title: "Reservations",
      icon: <CalendarDays size={20} />,
      path: "/reservations",
    },

    {
      title: "Emergency",
      icon: <ShieldAlert size={20} />,
      path: "/emergency",
    },

    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  const adminMenus = [
    {
      title: "Admin Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },

    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
    },

    {
      title: "Parking Management",
      icon: <Settings size={20} />,
      path: "/parking-management",
    },
  ];

  const menus =
    user?.role === "admin"
      ? adminMenus
      : userMenus;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobile && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 xl:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed xl:static z-50 top-0 left-0
          min-h-screen
          bg-white dark:bg-gray-900
          border-r border-gray-100 dark:border-gray-800
          flex flex-col p-6
          transition-all duration-300

          ${mobile
            ? "flex w-[280px]"
            : "hidden xl:flex"
          }

          ${collapsed
            ? "xl:w-[100px]"
            : "xl:w-[280px]"
          }
        `}
      >

        {/* TOP SECTION */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          {!collapsed && (
            <h1 className="text-3xl font-bold text-blue-600 italic">
              Smart Parking
            </h1>
          )}

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="hidden xl:flex w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 items-center justify-center"
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          {/* MOBILE CLOSE BUTTON */}
          {mobile && (
            <button
              onClick={closeSidebar}
              className="xl:hidden w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <X size={20} />
            </button>
          )}

        </div>

        {/* NAVIGATION */}
        <nav className="mt-12 flex-1 space-y-3">

          {menus.map((menu) => (
            <NavLink
              key={menu.title}
              to={menu.path}

              onClick={() => {
                if (mobile) {
                  closeSidebar();
                }
              }}

              className={({isActive}) =>
                `
                flex items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all

                ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:text-gray-300"
                }
              `
              }
            >

              {menu.icon}

              {!collapsed && (
                <span className="font-medium">
                  {menu.title}
                </span>
              )}

            </NavLink>
          ))}

        </nav>

        {/* LOGOUT */}
        <button className="flex items-center gap-3 text-red-500 font-medium mt-auto px-5 py-4 rounded-2xl hover:bg-red-50 transition">

          <LogOut size={20} />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </aside>
    </>
  );
}
