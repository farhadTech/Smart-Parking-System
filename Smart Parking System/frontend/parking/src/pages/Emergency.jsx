import {
  Ambulance,
  Phone,
  ShieldAlert,
} from "lucide-react";

export default function Emergency () {
  return (
    <div>

      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Emergency Support
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Get emergency assistance quickly
        </p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Security Alert Card (Stays vibrant red but adjusts hover/text states) */}
        <div className="bg-red-500 dark:bg-red-600 text-white rounded-[32px] p-8 shadow-sm transition-colors duration-200">
          <ShieldAlert size={50} />

          <h2 className="text-3xl font-bold mt-6">
            Security Alert
          </h2>

          <p className="mt-3 text-red-100">
            Contact parking security immediately
          </p>

          <button className="mt-8 h-12 px-6 rounded-xl bg-white text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer">
            Call Security
          </button>
        </div>

        {/* Medical Help Card */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
          <Ambulance
            size={50}
            className="text-blue-600 dark:text-blue-400"
          />

          <h2 className="text-3xl font-bold mt-6 text-gray-900 dark:text-white">
            Medical Help
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Emergency medical assistance
          </p>

          <button className="mt-8 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors cursor-pointer">
            Call Ambulance
          </button>
        </div>

      </div>

      {/* Bottom Contact Bar */}
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8 shadow-sm transition-colors duration-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-950/50 rounded-2xl flex items-center justify-center">
            <Phone className="text-green-600 dark:text-green-400" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Emergency Contact
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium select-all">
              +880 1234 567890
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
