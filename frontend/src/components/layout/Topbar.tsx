import { useState } from "react";
import { Bell, Search, Sun, Moon, X } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../features/auth/AuthContext";
import { useTheme } from "../../features/theme/ThemeContext";

type TopbarProps = {
  title: string;
};

const Topbar = ( { title }: TopbarProps ) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [ openNotifications, setOpenNotifications ] = useState( false );

  const notifications = [
    {
      id: 1,
      title: "Booking confirmed",
      message: "Your parking slot has been confirmed.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Payment successful",
      message: "Your payment receipt is ready.",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "Support update",
      message: "Admin replied to your support ticket.",
      time: "1 hour ago",
    },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success( isDark ? "Light mode enabled" : "Dark mode enabled" );
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 sm:px-6">
      <div>
        <h1 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
          { title }
        </h1>

        <p className="text-xs text-blue-600 dark:text-blue-300 sm:text-sm">
          Welcome back, { user?.name || "User" }
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-900 md:flex">
          <Search size={ 16 } className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
          />
        </div>

        <button
          type="button"
          onClick={ handleThemeToggle }
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          { isDark ? (
            <Sun size={ 18 } className="text-yellow-400" />
          ) : (
            <Moon size={ 18 } className="text-blue-500" />
          ) }
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={ () => setOpenNotifications( ( prev ) => !prev ) }
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <Bell size={ 18 } className="text-slate-700 dark:text-white" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          { openNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Notifications
                </h2>

                <button
                  type="button"
                  onClick={ () => setOpenNotifications( false ) }
                  className="cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X size={ 18 } />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                { notifications.map( ( item ) => (
                  <button
                    key={ item.id }
                    type="button"
                    onClick={ () => {
                      toast.success( item.title );
                      setOpenNotifications( false );
                    } }
                    className="w-full cursor-pointer border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      { item.title }
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      { item.message }
                    </p>

                    <p className="mt-2 text-xs text-blue-600 dark:text-blue-300">
                      { item.time }
                    </p>
                  </button>
                ) ) }
              </div>
            </div>
          ) }
        </div>

        <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-cyan-500 font-bold text-white transition-all duration-300 hover:scale-105">
          { user?.name?.charAt( 0 ).toUpperCase() || "U" }
        </button>
      </div>
    </header>
  );
};

export default Topbar;