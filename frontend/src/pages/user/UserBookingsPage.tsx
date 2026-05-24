import {
  Eye,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import Topbar from "../../components/layout/Topbar";

import StatusBadge from "../../components/common/StatusBadge";

import {
  cancelBooking,
  getAllBookings,
  getMyBookings,
  type BookingResponse,
} from "../../services/booking.api";

import { useAuth } from "../../features/auth/AuthContext";

import toast from "react-hot-toast";

const UserBookingsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const basePath =
    user?.role === "ADMIN"
      ? "/admin"
      : "/user";

  const [ bookings, setBookings ] =
    useState<BookingResponse[]>( [] );

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState<BookingResponse | null>(
    null
  );

  const [ loading, setLoading ] =
    useState( true );

  const loadBookings = async () => {
    try {
      const data =
        user?.role === "ADMIN"
          ? await getAllBookings()
          : await getMyBookings();

      setBookings( data );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load bookings." );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    loadBookings();
  }, [] );

  const handleCancel = async (
    bookingId: number
  ) => {
    try {
      await cancelBooking( bookingId );

      toast.success(
        "Booking cancelled successfully."
      );

      loadBookings();
    } catch ( error ) {
      console.error( error );

      toast.error(
        "Failed to cancel booking."
      );
    }
  };

  const activeCount =
    bookings.filter(
      ( booking ) =>
        booking.status === "ACTIVE"
    ).length;

  const upcomingCount =
    bookings.filter(
      ( booking ) =>
        booking.status === "UPCOMING"
    ).length;

  const completedCount =
    bookings.filter(
      ( booking ) =>
        booking.status === "COMPLETED"
    ).length;

  const cancelledCount =
    bookings.filter(
      ( booking ) =>
        booking.status === "CANCELLED"
    ).length;

  const getStatusLabel = (
    status: string
  ) => {
    if ( status === "ACTIVE" )
      return "Active";

    if ( status === "UPCOMING" )
      return "Upcoming";

    if ( status === "COMPLETED" )
      return "Completed";

    return "Cancelled";
  };

  if ( loading ) {
    return (
      <>
        <Topbar title="Bookings" />

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-lg font-bold text-blue-500">
            Loading bookings...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Bookings" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Reservations
            </h1>

            <p className="text-blue-600 dark:text-blue-300">
              Manage parking reservations
            </p>
          </div>

          <button
            type="button"
            onClick={ () =>
              navigate(
                `${ basePath }/locations`
              )
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] sm:w-fit"
          >
            <Plus size={ 18 } />
            New Reservation
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { [
            [
              String( activeCount ),
              "Active",
              "text-emerald-500",
            ],

            [
              String( upcomingCount ),
              "Upcoming",
              "text-yellow-500",
            ],

            [
              String( completedCount ),
              "Completed",
              "text-blue-500",
            ],

            [
              String( cancelledCount ),
              "Cancelled",
              "text-red-500",
            ],
          ].map(
            ( [ value, label, color ] ) => (
              <div
                key={ label }
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p
                  className={ `text-3xl font-bold ${ color }` }
                >
                  { value }
                </p>

                <p className="text-sm text-blue-600 dark:text-blue-300">
                  { label }
                </p>
              </div>
            )
          ) }
        </section>

        { bookings.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No bookings yet
            </h2>

            <button
              type="button"
              onClick={ () =>
                navigate(
                  `${ basePath }/locations`
                )
              }
              className="mt-6 rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white"
            >
              New Reservation
            </button>
          </section>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/40 dark:text-blue-300">
                  <tr>
                    <th className="px-6 py-4">
                      Booking
                    </th>

                    <th className="px-6 py-4">
                      Location
                    </th>

                    <th className="px-6 py-4">
                      Slot
                    </th>

                    <th className="px-6 py-4">
                      Vehicle
                    </th>

                    <th className="px-6 py-4">
                      Duration
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  { bookings.map(
                    ( booking ) => (
                      <tr
                        key={ booking.id }
                        className="border-t border-slate-200 dark:border-slate-800"
                      >
                        <td className="px-6 py-4 text-blue-500">
                          {
                            booking.bookingCode
                          }
                        </td>

                        <td className="px-6 py-4">
                          {
                            booking.locationName
                          }
                        </td>

                        <td className="px-6 py-4 font-bold">
                          {
                            booking.slotCode
                          }
                        </td>

                        <td className="px-6 py-4">
                          {
                            booking.vehicleNumber
                          }
                        </td>

                        <td className="px-6 py-4">
                          {
                            booking.durationHours
                          }{ " " }
                          hr
                        </td>

                        <td className="px-6 py-4">
                          ৳
                          {
                            booking.amount
                          }
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge
                            status={ getStatusLabel(
                              booking.status
                            ) }
                          />
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={ () =>
                                setSelectedBooking(
                                  booking
                                )
                              }
                              className="text-blue-500"
                            >
                              <Eye
                                size={ 16 }
                              />
                            </button>

                            { booking.status !==
                              "CANCELLED" && (
                                <button
                                  type="button"
                                  onClick={ () =>
                                    handleCancel(
                                      booking.id
                                    )
                                  }
                                  className="text-red-500"
                                >
                                  <Trash2
                                    size={ 16 }
                                  />
                                </button>
                              ) }
                          </div>
                        </td>
                      </tr>
                    )
                  ) }
                </tbody>
              </table>
            </div>
          </section>
        ) }
      </div>

      { selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Booking Details
              </h2>

              <button
                type="button"
                onClick={ () =>
                  setSelectedBooking(
                    null
                  )
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              { [
                [
                  "Booking",
                  selectedBooking.bookingCode,
                ],

                [
                  "Location",
                  selectedBooking.locationName,
                ],

                [
                  "Address",
                  selectedBooking.locationAddress,
                ],

                [
                  "Slot",
                  selectedBooking.slotCode,
                ],

                [
                  "Zone",
                  selectedBooking.zone,
                ],

                [
                  "Vehicle",
                  selectedBooking.vehicleNumber,
                ],

                [
                  "Duration",
                  `${ selectedBooking.durationHours } hr`,
                ],

                [
                  "Amount",
                  `৳${ selectedBooking.amount }`,
                ],

                [
                  "Created",
                  selectedBooking.createdAt,
                ],
              ].map(
                ( [ label, value ] ) => (
                  <div
                    key={ label }
                    className="flex justify-between"
                  >
                    <span className="text-blue-500">
                      { label }
                    </span>

                    <span className="font-bold">
                      { value }
                    </span>
                  </div>
                )
              ) }

              <div className="flex justify-between">
                <span className="text-blue-500">
                  Status
                </span>

                <StatusBadge
                  status={ getStatusLabel(
                    selectedBooking.status
                  ) }
                />
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default UserBookingsPage;
