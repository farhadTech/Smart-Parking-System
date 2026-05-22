import QRCode from "react-qr-code";

export default function BookingTicket ({
  booking,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 max-w-md mx-auto">

      <h2 className="text-3xl font-bold text-center dark:text-white">
        Parking Ticket
      </h2>

      <div className="mt-8 flex justify-center">

        <QRCode
          value={JSON.stringify(
            booking
          )}
          size={180}
        />

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Booking ID
          </span>

          <span className="font-semibold dark:text-white">
            {booking.id}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Slot
          </span>

          <span className="font-semibold dark:text-white">
            {booking.slotId}
          </span>
        </div>

      </div>

    </div>
  );
}
