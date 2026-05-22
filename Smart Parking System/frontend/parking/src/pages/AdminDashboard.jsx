import {
  CarFront,
  Users,
  CreditCard,
  CircleParking,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard () {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,284",
      icon: <CarFront size={24} />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      title: "Active Users",
      value: "892",
      icon: <Users size={24} />,
      color: "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    },
    {
      title: "Revenue",
      value: "$24,500",
      icon: <CreditCard size={24} />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    },
    {
      title: "Parking Slots",
      value: "240",
      icon: <CircleParking size={24} />,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Smart parking management overview
          </p>
        </div>

        <button className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white font-medium">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-900 rounded-[32px] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {stat.title}
                </p>

                <h2 className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
                  {stat.value}
                </h2>
              </div>

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-green-600 dark:text-green-400">
              <ArrowUpRight size={18} />
              <span className="font-medium text-sm">
                +12.5% this month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity and Brand Block section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Activities List */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activities
          </h2>

          <div className="mt-8 space-y-6">
            {[
              "New parking booking created",
              "Parking slot P-12 reserved",
              "Emergency request resolved",
              "New user registered",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 flex-shrink-0"></div>

                <p className="text-gray-700 dark:text-gray-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner Block */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[32px] p-8 text-white overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 text-[200px] opacity-10 font-bold select-none pointer-events-none">
            P
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl font-bold">
                Smart Parking System
              </h2>

              <p className="mt-4 text-blue-100 max-w-md">
                Manage all parking operations efficiently with real-time monitoring and analytics.
              </p>
            </div>

            <button className="mt-8 h-12 px-6 rounded-xl bg-white text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-100 transition font-semibold w-fit">
              View Analytics
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
