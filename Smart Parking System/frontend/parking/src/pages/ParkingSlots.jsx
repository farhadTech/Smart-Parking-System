import {useState} from "react";
import {useParking} from "../context/ParkingContext";
import BookingModal from "../components/parking/BookingModal";
import Button from "../components/ui/Button";
import Modal from "../components/common/Modal";
import ParkingMap from "../components/parking/ParkingMap";

import {
  CarFront,
  CircleCheck,
  CircleX,
} from "lucide-react";

export default function ParkingSlots () {
  const {slots} = useParking();

  // Dynamic state hooks for filtering and modular configurations
  const [filter, setFilter] = useState("All");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);

  // Filter slots computational logic
  const filteredSlots =
    filter === "All"
      ? slots
      : slots.filter((slot) => slot.status === filter);

  return (
    <div>
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Parking Slots
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Book available parking spaces
        </p>
      </div>

      {/* Filter Action Row */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Available", "Occupied"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer duration-150 border ${filter === item
                ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500 text-white"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/60"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSlots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Slot Number
                  </p>
                  <h2 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                    {slot.id}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <CarFront className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
              </div>

              {/* Status pill badge */}
              <div className="mt-5">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${slot.status === "Available"
                      ? "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-950/50 text-red-500 dark:text-red-400"
                    }`}
                >
                  {slot.status === "Available" ? (
                    <CircleCheck size={14} />
                  ) : (
                    <CircleX size={14} />
                  )}
                  {slot.status}
                </div>
              </div>
            </div>

            {/* CTA Buttons Action Row */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button
                variant="secondary"
                size="sm"
                className="h-11 rounded-xl text-sm"
                onClick={() => setSelectedSlot(slot)}
              >
                View Details
              </Button>

              <button
                disabled={slot.status !== "Available"}
                onClick={() => {
                  setSelectedSlot(slot);
                  setOpenBooking(true);
                }}
                className="h-11 px-4 rounded-xl text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 cursor-pointer disabled:cursor-not-allowed shadow-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Presentation Info Modal */}
      <Modal
        open={!!selectedSlot && !openBooking}
        onClose={() => setSelectedSlot(null)}
        title="Parking Slot Details"
      >
        {selectedSlot && (
          <div className="space-y-6 pt-2 text-gray-900 dark:text-white">
            <div className="grid grid-cols-2 gap-4 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-950/30">
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Slot ID
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {selectedSlot.id}
                </h3>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Current Status
                </p>
                <h3
                  className={`text-lg font-bold mt-1.5 ${selectedSlot.status === "Available"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                    }`}
                >
                  {selectedSlot.status}
                </h3>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              disabled={selectedSlot.status !== "Available"}
              onClick={() => setOpenBooking(true)}
            >
              {selectedSlot.status === "Available" ? "Proceed to Booking" : "Slot Occupied"}
            </Button>
          </div>
        )}
      </Modal>

      {/* Interactive Reservation Processing Modal Overlay */}
      <BookingModal
        open={openBooking}
        onClose={() => {
          setOpenBooking(false);
          setSelectedSlot(null);
        }}
        slot={selectedSlot}
      />
    </div>
  );
}
