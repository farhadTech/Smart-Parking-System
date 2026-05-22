import {useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

import Modal from "../common/Modal";
import Button from "../ui/Button";

import {useAuth} from "../../context/AuthContext";
import {useParking} from "../../context/ParkingContext";

export default function BookingModal ({
  open,
  onClose,
  slot,
}) {
  const {user} = useAuth();

  const {bookSlot} =
    useParking();

  const navigate =
    useNavigate();

  const [
    vehicleNumber,
    setVehicleNumber,
  ] = useState("");

  const handleBooking = () => {

    if (!vehicleNumber.trim()) {
      return toast.error(
        "Enter vehicle number"
      );
    }

    const success =
      bookSlot(
        slot.id,
        vehicleNumber
      );

    if (!success) {
      return toast.error(
        "Slot unavailable"
      );
    }

    // Booking data only
    const bookingData = {
      id:
        "BK-" +
        Date.now(),

      slotId:
        slot.id,

      zone:
        slot.zone ||
        "A Block",

      vehicleNumber,

      price:
        slot.price || 50,

      hours: 2,

      amount:
        (slot.price || 50) * 2,

      userId:
        user?.id,

      bookedAt:
        new Date().toISOString(),
    };

    toast.success(
      `Slot ${slot.id} booked successfully`
    );

    setVehicleNumber("");

    onClose();

    // Go to payment page
    navigate(
      "/payment",
      {
        state: {
          booking:
            bookingData,
        },
      }
    );
  };

  if (!slot)
    return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Book Parking Slot
      </h2>

      <div className="mt-6 space-y-4">

        {/* Slot */}
        <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">
            Slot ID
          </p>

          <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            {slot.id}
          </h3>
        </div>

        {/* Zone */}
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">
            Zone
          </p>

          <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {slot.zone || "A Block"}
          </h3>
        </div>

        {/* Price */}
        <div className="bg-green-50 dark:bg-green-950/40 p-5 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">
            Price Per Hour
          </p>

          <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            ৳ {slot.price || 50}
          </h3>
        </div>

        {/* Vehicle Input */}
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) =>
            setVehicleNumber(
              e.target.value
            )
          }
          className="
          w-full
          h-12
          rounded-2xl
          border
          border-gray-300
          dark:border-gray-700
          px-4
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-white
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

        <Button
          className="w-full"
          onClick={handleBooking}
        >
          Confirm Booking
        </Button>

      </div>
    </Modal>
  );
}