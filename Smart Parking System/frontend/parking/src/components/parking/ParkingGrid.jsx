import {
  Car,
  CircleCheck,
  CircleX,
  Clock3,
} from "lucide-react";

export default function ParkingGrid ({slots}) {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return {
          color:
            "bg-green-100 text-green-600 border-green-200",
          icon: <CircleCheck size={18} />,
        };

      case "occupied":
        return {
          color:
            "bg-red-100 text-red-500 border-red-200",
          icon: <CircleX size={18} />,
        };

      default:
        return {
          color:
            "bg-yellow-100 text-yellow-600 border-yellow-200",
          icon: <Clock3 size={18} />,
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">

      {slots.map((slot) => {
        const style = getStatusStyle(slot.status);

        return (
          <div
            key={slot.id}
            className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            {/* Top */}
            <div className="flex items-start justify-between">

              <div>
                <p className="text-gray-400 text-sm">
                  Parking Slot
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {slot.id}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Car size={26} />
              </div>
            </div>

            {/* Status */}
            <div
              className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${style.color}`}
            >
              {style.icon}
              {slot.status}
            </div>

            {/* Extra Info */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">

              <div>
                <p className="text-gray-400 text-xs">
                  Zone
                </p>

                <p className="font-semibold text-gray-700 mt-1">
                  A-Block
                </p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl text-sm font-medium">
                View
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
