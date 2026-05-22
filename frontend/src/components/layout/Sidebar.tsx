import { useState } from "react";
import { Car, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../features/auth/AuthContext";
import { useTheme } from "../../features/theme/ThemeContext";

type SidebarItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

type SidebarProps = {
  items: SidebarItem[];
};

const MAIN_MOBILE_ITEMS = [ "Dashboard", "Parking", "Bookings", "Support" ];

const Sidebar = ( { items }: SidebarProps ) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [ mobileMenuOpen, setMobileMenuOpen ] = useState( false );

  const mobileItems = items.filter( ( item ) =>
    MAIN_MOBILE_ITEMS.includes( item.label )
  );

  const isActive = ( path: string ) => location.pathname === path;

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success( isDark ? "Light mode enabled" : "Dark mode enabled" );
  };

  const handleLogout = () => {
    logout();
    toast.success( "Logged out successfully" );
  };

  const ThemeButton = () => (
    <button
      type="button"
      onClick={ handleThemeToggle }
      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
    >
      { isDark ? (
        <>
          <Sun size={ 18 } className="text-yellow-400" />
          Light Mode
        </>
      ) : (
        <>
          <Moon size={ 18 } className="text-blue-500" />
          Dark Mode
        </>
      ) }
    </button>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 md:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 transition duration-300 hover:scale-105">
            <Car size={ 20 } className="text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold leading-5 text-slate-900 dark:text-white">
              Smart
              <br />
              Parking
            </h1>

            <p className="mt-1 text-xs font-semibold text-blue-500 dark:text-blue-300">
              { user?.role === "ADMIN" ? "Admin Panel" : "User Panel" }
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          { items.map( ( item ) => {
            const Icon = item.icon;
            const active = isActive( item.path );

            return (
              <Link
                key={ item.path }
                to={ item.path }
                className={ `group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${ active
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }` }
              >
                <Icon
                  size={ 18 }
                  className="transition duration-300 group-hover:scale-110"
                />
                { item.label }
              </Link>
            );
          } ) }
        </nav>

        <div className="space-y-2 border-t border-slate-200 p-4 dark:border-slate-800">
          <ThemeButton />

          <button
            type="button"
            onClick={ handleLogout }
            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={ 18 } />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white px-2 py-2 dark:border-slate-800 dark:bg-slate-950 md:hidden">
        { mobileItems.map( ( item ) => {
          const Icon = item.icon;
          const active = isActive( item.path );

          return (
            <Link
              key={ item.path }
              to={ item.path }
              className={ `flex cursor-pointer flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold transition-all duration-300 active:scale-95 ${ active
                  ? "bg-blue-500 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                }` }
            >
              <Icon size={ 18 } />
              <span className="mt-1 max-w-[64px] truncate">{ item.label }</span>
            </Link>
          );
        } ) }

        <button
          type="button"
          onClick={ () => setMobileMenuOpen( true ) }
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
        >
          <Menu size={ 18 } />
          <span className="mt-1">Menu</span>
        </button>
      </nav>

      { mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500">
                  <Car size={ 20 } className="text-white" />
                </div>

                <div>
                  <h2 className="font-bold leading-5 text-slate-900 dark:text-white">
                    Smart
                    <br />
                    Parking
                  </h2>
                  <p className="mt-1 text-xs text-blue-500 dark:text-blue-300">
                    { user?.role === "ADMIN" ? "Admin Menu" : "User Menu" }
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={ () => setMobileMenuOpen( false ) }
                className="cursor-pointer rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={ 20 } />
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
              { items.map( ( item ) => {
                const Icon = item.icon;
                const active = isActive( item.path );

                return (
                  <Link
                    key={ item.path }
                    to={ item.path }
                    onClick={ () => setMobileMenuOpen( false ) }
                    className={ `group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${ active
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                      }` }
                  >
                    <Icon
                      size={ 18 }
                      className="transition duration-300 group-hover:scale-110"
                    />
                    { item.label }
                  </Link>
                );
              } ) }
            </div>

            <div className="space-y-2 border-t border-slate-200 p-4 dark:border-slate-800">
              <ThemeButton />

              <button
                type="button"
                onClick={ handleLogout }
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut size={ 18 } />
                Logout
              </button>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default Sidebar;