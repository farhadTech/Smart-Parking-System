export default function DashboardSkeleton () {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Hero */}
      <div className="h-64 rounded-[32px] bg-gray-200 dark:bg-gray-800"></div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-40 rounded-3xl bg-gray-200 dark:bg-gray-800"
          />
        ))}

      </div>

      {/* Table */}
      <div className="h-80 rounded-[32px] bg-gray-200 dark:bg-gray-800"></div>

    </div>
  );
}
