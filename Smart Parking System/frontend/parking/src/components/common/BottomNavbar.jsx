import {
  LayoutDashboard,
  CarFront,
  CalendarDays,
  ShieldAlert,
} from "lucide-react";

import {NavLink} from "react-router-dom";

export default function BottomNavbar () {
  const menus = [
    {
      title: "Home",
      icon: <LayoutDashboard size={22} />,
      path: "/dashboard",
    },
    {
      title: "Book",
      icon: <CarFront size={22} />,
      path: "/parking-slots",
    },
    {
      title: "Reserve",
      icon: <CalendarDays size={22} />,
      path: "/reservations",
    },
    {
      title: "Emergency",
      icon: <ShieldAlert size={22} />,
      path: "/emergency",
    },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-colors duration-200 shadow-lg">
      <div className="grid grid-cols-4 gap-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            className={({isActive}) =>
              `flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition-all duration-200 ${isActive
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`
            }
          >
            {menu.icon}
            <span className="text-xs font-medium">
              {menu.title}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
