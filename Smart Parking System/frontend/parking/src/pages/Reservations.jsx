import toast from "react-hot-toast";
import {useParking} from "../context/ParkingContext";
import ReservationTimer from "../components/parking/ReservationTimer";
import Button from "../components/ui/Button";

export default function Reservations () {
  const {
    reservations,
    cancelBooking,
  } = useParking();

  const handleCancel = (id) => {
    cancelBooking(id);
    toast.success("Reservation cancelled");
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Reservations
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
          Manage all reservations
        </p>
      </div>

      {/* 1. MOBILE ONLY VIEW: Stacked Card Layout (Hidden on Desktop) */}
      <div className="block md:hidden space-y-4">
        {reservations.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-400 shadow-sm">
            No reservations found
          </div>
        ) : (
          reservations.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-4 transition-colors"
            >
              {/* Card Header: ID & Status */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase block">Booking ID</span>
                  <span className="font-bold text-gray-900 dark:text-white text-base">{booking.id}</span>
                </div>
                <span className="bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                  Active
                </span>
              </div>

              {/* Card Body: Split Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-xs">Slot</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200 mt-0.5 block">{booking.slotId}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-xs">Vehicle No.</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200 mt-0.5 block tracking-wide uppercase">{booking.vehicleNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-xs">Time Remaining</span>
                  <div className="font-semibold text-gray-700 dark:text-gray-200 mt-0.5 block">
                    <ReservationTimer startTime={booking.startTime} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 block text-xs">Amount</span>
                  <span className="font-bold text-gray-900 dark:text-white mt-0.5 block">{booking.amount || "$0.00"}</span>
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-2">
                <Button
                  variant="danger"
                  className="w-full h-11 text-sm font-medium rounded-xl"
                  onClick={() => handleCancel(booking.id)}
                >
                  Cancel Reservation
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. DESKTOP ONLY VIEW: Structured Table (Hidden on Mobile) */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Booking ID</th>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Slot</th>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Vehicle Number</th>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Time Remaining</th>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Status</th>
                <th className="p-5 text-left text-gray-600 dark:text-gray-400 font-semibold text-sm">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {reservations.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No reservations found
                  </td>
                </tr>
              ) : (
                reservations.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors"
                  >
                    <td className="p-5 font-semibold text-gray-900 dark:text-white text-sm">
                      {booking.id}
                    </td>

                    <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                      {booking.slotId}
                    </td>

                    <td className="p-5 text-gray-600 dark:text-gray-300 text-sm tracking-wide uppercase">
                      {booking.vehicleNumber}
                    </td>

                    <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                      <ReservationTimer startTime={booking.startTime} />
                    </td>

                    <td className="p-5">
                      <span className="bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide inline-block">
                        Active
                      </span>
                    </td>

                    <td className="p-5">
                      <Button
                        variant="danger"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}