import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Analytics () {
  const data = [
    {month: "Jan", bookings: 120},
    {month: "Feb", bookings: 220},
    {month: "Mar", bookings: 180},
    {month: "Apr", bookings: 310},
    {month: "May", bookings: 400},
    {month: "Jun", bookings: 350},
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Parking statistics and reports
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Line Chart Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Monthly Bookings
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Booking growth overview
            </p>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-800"
                />
                <XAxis
                  dataKey="month"
                  className="text-xs font-medium"
                  tick={{fill: 'currentColor'}}
                  className="text-gray-400 dark:text-gray-500"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, #ffffff)',
                    borderColor: 'var(--tooltip-border, #e5e7eb)',
                    color: 'var(--tooltip-text, #111827)'
                  }}
                  className="dark:[--tooltip-bg:#111827] dark:[--tooltip-border:#1f2937] dark:[--tooltip-text:#ffffff] rounded-xl shadow-lg"
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Revenue Analytics
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Monthly revenue report
            </p>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-200 dark:stroke-gray-800"
                />
                <XAxis
                  dataKey="month"
                  tick={{fill: 'currentColor'}}
                  className="text-gray-400 dark:text-gray-500 text-xs font-medium"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg, #ffffff)',
                    borderColor: 'var(--tooltip-border, #e5e7eb)',
                    color: 'var(--tooltip-text, #111827)'
                  }}
                  className="dark:[--tooltip-bg:#111827] dark:[--tooltip-border:#1f2937] dark:[--tooltip-text:#ffffff] rounded-xl shadow-lg"
                />
                <Bar
                  dataKey="bookings"
                  fill="#2563eb"
                  className="fill-blue-600 dark:fill-blue-500"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top Parking Locations
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Location
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Bookings
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Revenue
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Occupancy
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-5 font-medium text-gray-900 dark:text-white">
                  Bashundhara City
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300">
                  320
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300">
                  $12,400
                </td>
                <td className="p-5">
                  <span className="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    87%
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-5 font-medium text-gray-900 dark:text-white">
                  Jamuna Future Park
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300">
                  290
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300">
                  $10,900
                </td>
                <td className="p-5">
                  <span className="bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    80%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
