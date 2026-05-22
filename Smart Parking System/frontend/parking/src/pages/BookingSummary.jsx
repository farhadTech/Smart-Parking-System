import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle2,
  MapPin,
  Clock3,
  CarFront,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import BookingTicket from
  "../components/parking/BookingTicket";

export default function BookingSummary () {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // FIXED:
  // receive booking data directly
  const booking =
    location.state?.booking;

  // If user refreshes page
  // or no booking data exists
  if (!booking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">

        <div
          className="
          bg-white
          dark:bg-gray-900
          rounded-[32px]
          p-10
          border
          border-gray-100
          dark:border-gray-800
          text-center
          max-w-lg
          w-full
          "
        >

          <div
            className="
            w-20
            h-20
            rounded-full
            bg-red-100
            dark:bg-red-950/30
            flex
            items-center
            justify-center
            mx-auto
            "
          >
            <span className="text-4xl">
              ⚠️
            </span>
          </div>

          <h2
            className="
            text-3xl
            font-bold
            mt-6
            dark:text-white
            "
          >
            No Booking Found
          </h2>

          <p
            className="
            text-gray-500
            dark:text-gray-400
            mt-3
            "
          >
            It looks like there
            is no booking data
            available.
          </p>

          <button
            onClick={() =>
              navigate(
                "/parking-slots"
              )
            }
            className="
            mt-8
            h-12
            px-6
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
            "
          >
            Book Parking
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div
        className="
        bg-gradient-to-r
        from-green-600
        to-emerald-500
        rounded-[32px]
        p-8
        text-white
        relative
        overflow-hidden
        "
      >

        {/* Background Check Icon */}
        <div
          className="
          absolute
          right-0
          top-0
          text-[220px]
          opacity-10
          font-bold
          "
        >
          ✓
        </div>

        <div
          className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-8
          "
        >

          <div>

            <div
              className="
              inline-flex
              items-center
              gap-2
              bg-white/20
              px-5
              py-2
              rounded-full
              "
            >
              <CheckCircle2
                size={18}
              />

              Booking Confirmed
            </div>

            <h1
              className="
              text-5xl
              font-bold
              mt-5
              "
            >
              Parking Reserved
            </h1>

            <p
              className="
              text-green-100
              mt-3
              text-lg
              "
            >
              Your parking slot
              has been reserved
              successfully.
            </p>

          </div>

          {/* Booking ID */}
          <div
            className="
            bg-white/10
            backdrop-blur-md
            rounded-[28px]
            p-6
            "
          >

            <p className="text-green-100">
              Booking ID
            </p>

            <h2
              className="
              text-3xl
              font-bold
              mt-2
              "
            >
              #{booking.id}
            </h2>

          </div>

        </div>
      </div>

      {/* Main Grid */}
      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >

        {/* Left Side */}
        <div
          className="
          xl:col-span-2
          space-y-6
          "
        >

          {/* Booking Details */}
          <div
            className="
            bg-white
            dark:bg-gray-900
            rounded-[32px]
            p-8
            border
            border-gray-100
            dark:border-gray-800
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              dark:text-white
              "
            >
              Booking Details
            </h2>

            <div
              className="
              grid
              md:grid-cols-2
              gap-5
              mt-8
              "
            >

              <InfoCard
                icon={
                  <CarFront />
                }
                title="Slot ID"
                value={
                  booking.slotId
                }
              />

              <InfoCard
                icon={
                  <MapPin />
                }
                title="Zone"
                value={
                  booking.zone
                }
              />

              <InfoCard
                icon={
                  <Clock3 />
                }
                title="Duration"
                value={`${booking.hours} Hours`}
              />

              <InfoCard
                icon={
                  <CreditCard />
                }
                title="Amount"
                value={`৳ ${booking.price}`}
              />

              <InfoCard
                icon={
                  <CarFront />
                }
                title="Vehicle"
                value={
                  booking.vehicleNumber
                }
              />

            </div>

          </div>

          {/* Timer */}
          <div
            className="
            bg-white
            dark:bg-gray-900
            rounded-[32px]
            p-8
            border
            border-gray-100
            dark:border-gray-800
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              dark:text-white
              "
            >
              Parking Countdown
            </h2>

            <BookingTimer
              hours={
                booking.hours
              }
            />

          </div>

          {/* Buttons */}
          <div
            className="
            flex
            flex-wrap
            gap-4
            "
          >

            <button
              onClick={() =>
                navigate(
                  "/reservations"
                )
              }
              className="
              h-12
              px-6
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-medium
              flex
              items-center
              gap-2
              transition
              "
            >
              View Reservations

              <ArrowRight
                size={18}
              />
            </button>

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="
              h-12
              px-6
              rounded-2xl
              bg-gray-100
              hover:bg-gray-200
              dark:bg-gray-800
              dark:hover:bg-gray-700
              dark:text-white
              font-medium
              transition
              "
            >
              Back Dashboard
            </button>

          </div>

        </div>

        {/* Right Side Ticket */}
        <div>
          <BookingTicket
            booking={booking}
          />
        </div>

      </div>

    </div>
  );
}

function InfoCard ({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
      bg-gray-50
      dark:bg-gray-800
      rounded-3xl
      p-5
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        text-blue-600
        "
      >
        {icon}
      </div>

      <p
        className="
        text-gray-500
        mt-4
        "
      >
        {title}
      </p>

      <h3
        className="
        text-2xl
        font-bold
        mt-1
        dark:text-white
        break-words
        "
      >
        {value}
      </h3>

    </div>
  );
}

function BookingTimer ({
  hours,
}) {
  return (
    <div
      className="
      mt-6
      text-center
      "
    >

      <h1
        className="
        text-5xl
        font-bold
        text-blue-600
        "
      >
        {hours}:00:00
      </h1>

      <p
        className="
        text-gray-500
        mt-3
        "
      >
        Remaining parking time
      </p>

    </div>
  );
}