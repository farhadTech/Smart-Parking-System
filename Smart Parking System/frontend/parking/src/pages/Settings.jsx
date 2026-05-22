import ThemeToggle
  from "../components/common/ThemeToggle";

export default function Settings () {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold dark:text-white">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage preferences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold dark:text-white">
              Dark Mode
            </h2>

            <p className="text-gray-500 mt-2">
              Toggle app appearance
            </p>
          </div>

          <ThemeToggle />

        </div>

      </div>

    </div>
  );
}
