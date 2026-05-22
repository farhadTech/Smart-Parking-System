import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  CreditCard,
  Wallet,
  BadgeDollarSign,
} from "lucide-react";

import {
  useParking,
} from "../context/ParkingContext";

export default function Payment () {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    addReservation,
  } = useParking();

  const booking =
    location.state?.booking;

  if (!booking) {
    navigate(
      "/parking-slots"
    );
    return null;
  }

  const handlePayment =
    (method) => {

      // Create reservation AFTER payment
      const reservation = {
        ...booking,
        paymentMethod:
          method,
        paymentStatus:
          "Paid",
        status:
          "Confirmed",
      };

      addReservation(
        reservation
      );

      toast.success(
        "Payment Successful"
      );

      navigate(
        "/booking-summary",
        {
          state: {
            booking:
              reservation,
          },
        }
      );
    };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold dark:text-white">
          Payment
        </h1>

        <p className="text-gray-500 mt-2">
          Complete your parking reservation
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800">

        <h2 className="text-2xl font-bold dark:text-white">
          Booking Details
        </h2>

        <div className="mt-6 space-y-4">

          <PaymentRow
            label="Slot"
            value={booking.slotId}
          />

          <PaymentRow
            label="Zone"
            value={booking.zone}
          />

          <PaymentRow
            label="Vehicle"
            value={booking.vehicleNumber}
          />

          <PaymentRow
            label="Duration"
            value={`${booking.hours} Hours`}
          />

          <PaymentRow
            label="Amount"
            value={`৳ ${booking.amount}`}
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid md:grid-cols-3 gap-5">

        <button
          onClick={() =>
            handlePayment(
              "Card"
            )
          }
          className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:scale-105 transition"
        >
          <CreditCard
            size={40}
          />

          <h3 className="text-xl font-bold mt-4 dark:text-white">
            Card Payment
          </h3>
        </button>

        <button
          onClick={() =>
            handlePayment(
              "Bkash"
            )
          }
          className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:scale-105 transition"
        >
          <Wallet
            size={40}
          />

          <h3 className="text-xl font-bold mt-4 dark:text-white">
            bKash
          </h3>
        </button>

        <button
          onClick={() =>
            handlePayment(
              "Nagad"
            )
          }
          className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 hover:scale-105 transition"
        >
          <BadgeDollarSign
            size={40}
          />

          <h3 className="text-xl font-bold mt-4 dark:text-white">
            Nagad
          </h3>
        </button>

      </div>
    </div>
  );
}

function PaymentRow ({
  label,
  value,
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold dark:text-white">
        {value}
      </span>
    </div>
  );
}