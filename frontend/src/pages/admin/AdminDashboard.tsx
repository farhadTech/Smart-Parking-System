import {
  BarChart3,
  CalendarDays,
  Car,
  DollarSign,
  Download,
  MapPin,
  ShieldAlert,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";

const recentBookings = [
  ["BK-1001", "A-01", "DHK-1234", "May 22, 2026", "৳4.50", "Active"],
  ["BK-1002", "A-05", "SYL-9012", "May 22, 2026", "৳2.50", "Active"],
  ["BK-1003", "B-01", "DHK-3456", "May 22, 2026", "৳6.00", "Active"],
  ["BK-1004", "A-03", "CTG-5678", "May 22, 2026", "৳3.00", "Upcoming"],
  ["BK-1005", "B-04", "RJH-7890", "May 21, 2026", "৳3.50", "Completed"],
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Manage Parking",
      path: "/admin/parking",
      icon: Car,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
      icon: CalendarDays,
      color: "text-cyan-500 dark:text-cyan-400",
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Management",
      path: "/admin/management",
      icon: Users,
      color: "text-emerald-500 dark:text-emerald-400",
    },
    {
      title: "Emergency",
      path: "/admin/emergency",
      icon: ShieldAlert,
      color: "text-red-500 dark:text-red-400",
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
      color: "text-yellow-500 dark:text-yellow-400",
    },
  ];

  return (
    <>
      <Topbar title="Admin Dashboard" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 shadow-xl shadow-blue-500/10 sm:p-8">
          <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-100 sm:text-base">
                Welcome back, Admin
              </p>

              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Smart Parking Control Center
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Monitor parking activity, manage bookings, track revenue, and
                supervise system operations from one dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/analytics")}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/15 px-6 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 active:scale-[0.98] sm:w-fit"
            >
              <TrendingUp size={20} />
              View Analytics
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Slots"
            value="112"
            subtitle="Across 4 locations"
            icon={Car}
            color="blue"
            onClick={() => navigate("/admin/parking")}
          />

          <StatCard
            title="Active Users"
            value="342"
            subtitle="+5 new today"
            icon={Users}
            color="green"
            onClick={() => navigate("/admin/management")}
          />

          <StatCard
            title="Today Revenue"
            value="৳12,450"
            subtitle="+18% vs yesterday"
            icon={DollarSign}
            color="yellow"
            onClick={() => navigate("/admin/analytics")}
          />

          <StatCard
            title="Active Bookings"
            value="38"
            subtitle="Ongoing sessions"
            icon={CalendarDays}
            color="cyan"
            onClick={() => navigate("/admin/bookings")}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 xl:col-span-2">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-bold text-slate-900 dark:text-white">
                Occupancy Overview
              </h2>

              <button
                type="button"
                onClick={() => navigate("/admin/analytics")}
                className="w-fit cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 active:scale-[0.98] dark:border-slate-700 dark:text-blue-300 dark:hover:text-white"
              >
                Details
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="flex h-64 min-w-[620px] items-end gap-5 border-b border-l border-slate-200 px-4 dark:border-slate-800">
                {[45, 60, 78, 92, 70, 84, 66, 52].map((height, index) => (
                  <button
                    key={index}
                    type="button"
                    title={`Occupancy ${height}%`}
                    className="group flex flex-1 cursor-pointer flex-col items-center gap-2 active:scale-[0.98]"
                  >
                    <div
                      className="w-full rounded-t-xl bg-blue-500 transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                      style={{ height: `${height}%` }}
                    />

                    <span className="text-xs text-slate-500 transition group-hover:text-blue-500 dark:group-hover:text-blue-300">
                      {
                        [
                          "6am",
                          "8am",
                          "10am",
                          "12pm",
                          "2pm",
                          "4pm",
                          "6pm",
                          "8pm",
                        ][index]
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-6 font-bold text-slate-900 dark:text-white">
              Location Status
            </h2>

            <div className="space-y-4">
              {[
                ["Gulshan", "78%", "High"],
                ["Banani", "42%", "Low"],
                ["Dhanmondi", "91%", "High"],
                ["Uttara", "35%", "Low"],
              ].map(([area, percent, status]) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => navigate("/admin/parking")}
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500 dark:text-blue-400" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        {area}
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        status === "High"
                          ? "bg-red-500/15 text-red-500 dark:text-red-400"
                          : "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: percent }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-blue-600 dark:text-blue-300">
                    {percent} occupied
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold text-slate-900 dark:text-white">
            Admin Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-50 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20 dark:bg-slate-800">
                    <Icon className={item.color} size={22} />
                  </div>

                  <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 dark:text-blue-300 dark:group-hover:text-white">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <h2 className="font-bold text-slate-900 dark:text-white">
              Recent Bookings
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/bookings")}
                className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 active:scale-[0.98] dark:border-slate-700 dark:text-blue-300 dark:hover:text-white"
              >
                View All
              </button>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-blue-600 dark:text-blue-300">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Slot</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking[0]}
                    onClick={() => navigate("/admin/bookings")}
                    className="cursor-pointer border-t border-slate-200 transition-all duration-200 hover:bg-slate-50 active:scale-[0.999] dark:border-slate-800 dark:hover:bg-slate-800/70"
                  >
                    <td className="px-6 py-4 text-blue-600 dark:text-blue-400">
                      {booking[0]}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {booking[1]}
                    </td>

                    <td className="px-6 py-4 text-slate-700 dark:text-white">
                      {booking[2]}
                    </td>

                    <td className="px-6 py-4 text-blue-600 dark:text-blue-300">
                      {booking[3]}
                    </td>

                    <td className="px-6 py-4 text-slate-900 dark:text-white">
                      {booking[4]}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={booking[5] as any} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;