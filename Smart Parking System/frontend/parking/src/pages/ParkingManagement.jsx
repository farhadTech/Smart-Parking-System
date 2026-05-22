import {
  Plus,
  CircleCheck,
  CircleX,
} from "lucide-react";

export default function ParkingManagement () {
  const slots = Array.from(
    {length: 10},
    (_, i) => ({
      id: `P-${i + 1}`,
      status:
        i % 2 === 0
          ? "Available"
          : "Occupied",
    })
  );

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Parking Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage all parking slots
          </p>
        </div>

        <button className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white flex items-center gap-3 font-medium">
          <Plus size={18} />
          Add Slot
        </button>
      </div>

      {/* Slots Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Slot ID
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Zone
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Status
                </th>
                <th className="p-5 text-left text-gray-700 dark:text-gray-300 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {slots.map((slot) => (
                <tr
                  key={slot.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-5 font-medium text-gray-900 dark:text-white">
                    {slot.id}
                  </td>

                  <td className="p-5 text-gray-600 dark:text-gray-300">
                    A Block
                  </td>

                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${slot.status === "Available"
                          ? "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-950/50 text-red-500 dark:text-red-400"
                        }`}
                    >
                      {slot.status === "Available" ? (
                        <CircleCheck size={16} />
                      ) : (
                        <CircleX size={16} />
                      )}
                      {slot.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <button className="px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition text-white font-medium">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}