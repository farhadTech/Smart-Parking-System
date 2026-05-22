export default function OccupancyCard ({
  occupied,
  total,
}) {
  const percentage =
    Math.floor(
      (occupied / total) *
      100
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800">

      <h2 className="text-2xl font-bold dark:text-white">
        Occupancy Rate
      </h2>

      <div className="mt-8">

        <div className="flex items-center justify-between mb-3">

          <span className="text-gray-500">
            Usage
          </span>

          <span className="font-semibold dark:text-white">
            {percentage}%
          </span>

        </div>

        <div className="h-4 rounded-full bg-gray-100 overflow-hidden">

          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">

          <p className="text-gray-500">
            Available
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {total - occupied}
          </h3>

        </div>

        <div className="bg-red-50 rounded-2xl p-5">

          <p className="text-gray-500">
            Occupied
          </p>

          <h3 className="text-3xl font-bold text-red-500 mt-2">
            {occupied}
          </h3>

        </div>

      </div>

    </div>
  );
}