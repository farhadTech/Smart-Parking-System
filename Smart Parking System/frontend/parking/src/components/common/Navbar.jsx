import shajuImg from "../../assets/Shaju.jpeg";

import {
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Circle,
} from "lucide-react";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

import {
  useState,
  useEffect,
  useRef,
} from "react";

export default function Navbar () {

  const {logout, user} =
    useAuth();

  const navigate =
    useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  /* PROFILE DROPDOWN */
  const [openProfile, setOpenProfile] =
    useState(false);

  /* NOTIFICATION DROPDOWN */
  const [openNotification, setOpenNotification] =
    useState(false);

  const profileRef = useRef(null);

  const notificationRef =
    useRef(null);

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  /* CLOSE DROPDOWNS OUTSIDE CLICK */
  useEffect(() => {

    function handleClickOutside (
      event
    ) {

      /* PROFILE */
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {

        setOpenProfile(false);

      }

      /* NOTIFICATION */
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {

        setOpenNotification(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (
    <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 md:px-8 flex items-center justify-between relative z-40">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold dark:text-white">

          {user?.role === "admin"
            ? "Admin Panel"
            : "Dashboard"}

        </h1>

        <p className="text-sm text-gray-500">

          Welcome back, {user?.name}

        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* THEME */}
        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* NOTIFICATIONS */}
        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            onClick={() =>
              setOpenNotification(
                !openNotification
              )
            }
            className="relative w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
          >

            <Bell className="dark:text-white" />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

              3

            </span>

          </button>

          {/* NOTIFICATION DROPDOWN */}
          {openNotification && (

            <div className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 z-[9999] animate-in fade-in zoom-in duration-200">

              <div className="flex items-center justify-between mb-4">

                <h3 className="font-bold text-lg dark:text-white">

                  Notifications

                </h3>

                <span className="text-sm text-blue-600 cursor-pointer">

                  Mark all read

                </span>

              </div>

              <div className="space-y-3">

                {/* ITEM */}
                <div className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">

                  <Circle
                    size={10}
                    className="fill-blue-500 text-blue-500 mt-2"
                  />

                  <div>

                    <p className="font-medium dark:text-white">

                      Parking Slot Reserved

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      Your slot A-201 was reserved successfully.

                    </p>

                  </div>

                </div>

                {/* ITEM */}
                <div className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">

                  <Circle
                    size={10}
                    className="fill-green-500 text-green-500 mt-2"
                  />

                  <div>

                    <p className="font-medium dark:text-white">

                      Payment Successful

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      Monthly parking payment completed.

                    </p>

                  </div>

                </div>

                {/* ITEM */}
                <div className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">

                  <Circle
                    size={10}
                    className="fill-red-500 text-red-500 mt-2"
                  />

                  <div>

                    <p className="font-medium dark:text-white">

                      Emergency Alert

                    </p>

                    <p className="text-sm text-gray-500 mt-1">

                      Suspicious vehicle detected at Gate 2.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

        {/* PROFILE */}
        <div
          className="relative"
          ref={profileRef}
        >

          <button
            onClick={() =>
              setOpenProfile(
                !openProfile
              )
            }
            className="flex items-center gap-2 cursor-pointer"
          >

            <img
              src={shajuImg}
              alt="profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
            />

            <ChevronDown
              size={18}
              className={`dark:text-white transition-transform duration-300 ${openProfile
                  ? "rotate-180"
                  : ""
                }`}
            />

          </button>

          {/* PROFILE DROPDOWN */}
          {openProfile && (

            <div className="absolute right-0 top-16 w-64 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3 z-[9999] animate-in fade-in zoom-in duration-200">

              {/* USER */}
              <div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-800">

                <img
                  src={shajuImg}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold dark:text-white">

                    {user?.name}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {user?.email}

                  </p>

                </div>

              </div>

              {/* MENU */}
              <div className="mt-2 space-y-1">

                <button
                  onClick={() => {

                    navigate("/profile");

                    setOpenProfile(false);

                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-gray-200"
                >

                  <User size={18} />

                  Profile

                </button>

                <button
                  onClick={() => {

                    navigate("/settings");

                    setOpenProfile(false);

                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-gray-200"
                >

                  <Settings size={18} />

                  Settings

                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 transition"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}