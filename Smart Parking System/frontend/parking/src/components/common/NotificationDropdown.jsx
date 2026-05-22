export default function NotificationDropdown ({
  open,
}) {
  if (!open) return null;

  const notifications = [
    {
      title:
        "Parking booked successfully",
      time: "2 min ago",
    },
    {
      title:
        "Slot P-5 became available",
      time: "10 min ago",
    },
    {
      title:
        "Payment completed",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="absolute top-16 right-0 w-[340px] bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden z-50">

      <div className="p-5 border-b border-gray-100 dark:border-gray-800">

        <h2 className="text-xl font-bold dark:text-white">
          Notifications
        </h2>

      </div>

      <div className="max-h-[400px] overflow-y-auto">

        {notifications.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="p-5 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >

              <h3 className="font-semibold dark:text-white">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {item.time}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}
