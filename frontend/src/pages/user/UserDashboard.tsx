import {
  CalendarDays,
  Car,
  Clock,
  CreditCard,
  MapPin,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../features/auth/AuthContext";

import {
  cardStyle,
  clickableCardStyle,
  pageStyle,
  titleStyle,
  mutedTextStyle,
  buttonStyle,
} from "../../styles/theme";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ time, setTime ] = useState( "" );

  useEffect( () => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString( "en-BD", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        } )
      );
    };

    updateTime();

    const interval = setInterval( updateTime, 1000 );

    return () => clearInterval( interval );
  }, [] );

  const quickActions = [
    {
      title: "Find Parking",
      description: "Choose location and book a slot",
      icon: MapPin,
      path: "/user/locations",
      color:
        "text-blue-500 bg-blue-100 dark:bg-blue-500/15 dark:text-blue-300",
    },
    {
      title: "My Bookings",
      description: "View active and previous bookings",
      icon: CalendarDays,
      path: "/user/bookings",
      color:
        "text-emerald-500 bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300",
    },
    {
      title: "Emergency",
      description: "Get urgent parking support",
      icon: ShieldAlert,
      path: "/user/emergency",
      color:
        "text-red-500 bg-red-100 dark:bg-red-500/15 dark:text-red-300",
    },
    {
      title: "Profile",
      description: "Manage account and vehicle info",
      icon: User,
      path: "/user/profile",
      color:
        "text-purple-500 bg-purple-100 dark:bg-purple-500/15 dark:text-purple-300",
    },
  ];

  return (
    <>
      <Topbar title="Dashboard" />

      <div className={ pageStyle }>
        {/* Hero */ }
        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-blue-100">
                Good day, { user?.name || "User" }
              </p>

              <h1 className="mt-2 text-4xl font-bold text-white md:text-6xl">
                { time }
              </h1>

              <p className="mt-2 text-blue-100">
                { new Date().toLocaleDateString( "en-BD", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                } ) }
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 text-yellow-300" />

                <div>
                  <h2 className="font-bold text-white">
                    Smart Suggestion
                  </h2>

                  <p className="mt-1 text-sm text-blue-100">
                    Select a location to find the best available parking near
                    you.
                  </p>
                </div>
              </div>

              <button
                onClick={ () => navigate( "/user/locations" ) }
                className="mt-5 rounded-2xl bg-white px-5 py-3 font-bold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 active:scale-[0.98]"
              >
                Find Parking
              </button>
            </div>
          </div>
        </section>

        {/* Stats */ }
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active Booking"
            value="1"
            subtitle="Currently running"
            icon={ Car }
            color="blue"
          />

          <StatCard
            title="Saved Vehicle"
            value="DHK-1234"
            subtitle="Primary vehicle"
            icon={ Car }
            color="green"
          />

          <StatCard
            title="Next Session"
            value="2h"
            subtitle="Average booking duration"
            icon={ Clock }
            color="purple"
          />

          <StatCard
            title="Wallet / Due"
            value="৳0"
            subtitle="No pending payment"
            icon={ CreditCard }
            color="yellow"
          />
        </section>

        {/* Quick Actions */ }
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className={ `text-2xl font-bold ${ titleStyle }` }>
              Quick Actions
            </h2>

            <span className={ mutedTextStyle }>
              Tap to continue
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            { quickActions.map( ( item ) => {
              const Icon = item.icon;

              return (
                <button
                  key={ item.title }
                  onClick={ () => navigate( item.path ) }
                  className={ `${ clickableCardStyle } p-6 text-left` }
                >
                  <div
                    className={ `mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${ item.color }` }
                  >
                    <Icon />
                  </div>

                  <h3 className={ `text-lg font-bold ${ titleStyle }` }>
                    { item.title }
                  </h3>

                  <p className={ `mt-2 text-sm ${ mutedTextStyle }` }>
                    { item.description }
                  </p>
                </button>
              );
            } ) }
          </div>
        </section>

        {/* Booking + Notifications */ }
        <section className="grid gap-6 xl:grid-cols-2">
          {/* Current Booking */ }
          <div className={ `${ cardStyle } p-6` }>
            <h2 className={ `mb-4 text-2xl font-bold ${ titleStyle }` }>
              Current Booking
            </h2>

            <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className={ mutedTextStyle }>Slot</p>

                  <h3 className={ `text-2xl font-bold ${ titleStyle }` }>
                    A-02
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-bold text-emerald-500 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Location
                  </p>

                  <p className={ `font-bold ${ titleStyle }` }>
                    City Center Garage
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Vehicle
                  </p>

                  <p className={ `font-bold ${ titleStyle }` }>
                    DHK-1234
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Ends In
                  </p>

                  <p className={ `font-bold ${ titleStyle }` }>
                    1h 25m
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={ () => navigate( "/user/bookings" ) }
              className={ `mt-5 w-full ${ buttonStyle }` }
            >
              View Booking
            </button>
          </div>

          {/* Notifications */ }
          <div className={ `${ cardStyle } p-6` }>
            <h2 className={ `mb-4 text-2xl font-bold ${ titleStyle }` }>
              Notifications
            </h2>

            <div className="space-y-4">
              { [
                {
                  title: "Booking reminder",
                  desc: "Your parking session will expire soon.",
                },
                {
                  title: "Location tip",
                  desc: "Banani Plaza has more available slots right now.",
                },
                {
                  title: "Payment status",
                  desc: "No pending payments found.",
                },
              ].map( ( item ) => (
                <div
                  key={ item.title }
                  className="rounded-2xl bg-slate-100 p-4 transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800"
                >
                  <h3 className={ `font-bold ${ titleStyle }` }>
                    { item.title }
                  </h3>

                  <p className={ `mt-1 text-sm ${ mutedTextStyle }` }>
                    { item.desc }
                  </p>
                </div>
              ) ) }
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDashboard;