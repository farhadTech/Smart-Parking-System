import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Eye,
  RefreshCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";
import StatusBadge from "../../components/common/StatusBadge";

import {
  cancelBooking,
  completeBooking,
  getAllBookings,
  type BookingResponse,
} from "../../services/booking.api";

const getStatusLabel = ( status: BookingResponse[ "status" ] ) => {
  if ( status === "ACTIVE" ) return "Active";
  if ( status === "UPCOMING" ) return "Upcoming";
  if ( status === "COMPLETED" ) return "Completed";
  return "Cancelled";
};

const AdminBookingsPage = () => {
  const [ bookings, setBookings ] = useState<BookingResponse[]>( [] );
  const [ selectedBooking, setSelectedBooking ] =
    useState<BookingResponse | null>( null );
  const [ search, setSearch ] = useState( "" );
  const [ loading, setLoading ] = useState( true );
  const [ actionId, setActionId ] = useState<number | null>( null );

  const loadBookings = async () => {
    try {
      setLoading( true );
      const data = await getAllBookings();
      setBookings( data );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load bookings" );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    loadBookings();
  }, [] );

  const handleCancel = async ( bookingId: number ) => {
    try {
      setActionId( bookingId );
      await cancelBooking( bookingId );
      toast.success( "Booking cancelled" );
      await loadBookings();
    } catch ( error ) {
      console.error( error );
      toast.error( "Cancel failed" );
    } finally {
      setActionId( null );
    }
  };

  const handleComplete = async ( bookingId: number ) => {
    try {
      setActionId( bookingId );
      await completeBooking( bookingId );
      toast.success( "Booking completed" );
      await loadBookings();
    } catch ( error ) {
      console.error( error );
      toast.error( "Complete failed" );
    } finally {
      setActionId( null );
    }
  };

  const filteredBookings = useMemo( () => {
    return bookings.filter( ( booking ) => {
      const text = `
        ${ booking.bookingCode }
        ${ booking.userName }
        ${ booking.userEmail }
        ${ booking.locationName }
        ${ booking.locationArea }
        ${ booking.slotCode }
        ${ booking.zone }
        ${ booking.vehicleNumber }
        ${ booking.status }
      `.toLowerCase();

      return text.includes( search.toLowerCase() );
    } );
  }, [ bookings, search ] );

  const activeCount = bookings.filter( ( booking ) => booking.status === "ACTIVE" ).length;
  const completedCount = bookings.filter( ( booking ) => booking.status === "COMPLETED" ).length;
  const cancelledCount = bookings.filter( ( booking ) => booking.status === "CANCELLED" ).length;
  const totalAmount = bookings.reduce( ( sum, booking ) => sum + booking.amount, 0 );

  return (
    <>
      <Topbar title="Bookings" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Booking Management
          </h1>
          <p className="text-blue-600 dark:text-blue-300">
            View, cancel, and complete all parking reservations
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { [
            [ "Total Bookings", bookings.length, "text-blue-500" ],
            [ "Active", activeCount, "text-emerald-500" ],
            [ "Completed", completedCount, "text-indigo-500" ],
            [ "Revenue Value", `৳${ totalAmount }`, "text-yellow-500" ],
          ].map( ( [ label, value, color ] ) => (
            <div
              key={ label }
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm text-blue-600 dark:text-blue-300">
                { label }
              </p>
              <h2 className={ `mt-2 text-3xl font-bold ${ color }` }>
                { value }
              </h2>
            </div>
          ) ) }
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 lg:w-96">
              <Search size={ 18 } className="text-blue-500" />
              <input
                value={ search }
                onChange={ ( event ) => setSearch( event.target.value ) }
                placeholder="Search bookings..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
              />
            </div>

            <button
              type="button"
              onClick={ loadBookings }
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
            >
              <RefreshCcw size={ 18 } />
              Refresh
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          { loading ? (
            <div className="p-10 text-center font-semibold text-blue-500">
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">
              No bookings found.
            </div>
          ) : (
            <>
              <div className="space-y-4 p-4 lg:hidden">
                { filteredBookings.map( ( booking ) => (
                  <div
                    key={ booking.id }
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-300">
                          Booking
                        </p>
                        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                          { booking.bookingCode }
                        </h3>
                      </div>

                      <StatusBadge status={ getStatusLabel( booking.status ) } />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          User
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { booking.userEmail }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Location
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { booking.locationName }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Slot
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { booking.slotCode }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Vehicle
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { booking.vehicleNumber }
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Duration
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          { booking.durationHours } hr
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 dark:text-slate-400">
                          Amount
                        </p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                          ৳{ booking.amount }
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={ () => setSelectedBooking( booking ) }
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white"
                      >
                        <Eye size={ 16 } />
                        View
                      </button>

                      { booking.status !== "COMPLETED" &&
                        booking.status !== "CANCELLED" && (
                          <button
                            type="button"
                            disabled={ actionId === booking.id }
                            onClick={ () => handleComplete( booking.id ) }
                            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <CheckCircle size={ 16 } />
                            Complete
                          </button>
                        ) }

                      { booking.status !== "CANCELLED" &&
                        booking.status !== "COMPLETED" && (
                          <button
                            type="button"
                            disabled={ actionId === booking.id }
                            onClick={ () => handleCancel( booking.id ) }
                            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={ 16 } />
                            Cancel
                          </button>
                        ) }
                    </div>
                  </div>
                ) ) }
              </div>

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1150px] text-left text-sm">
                  <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                    <tr>
                      <th className="px-6 py-4">Booking</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Slot</th>
                      <th className="px-6 py-4">Vehicle</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { filteredBookings.map( ( booking ) => (
                      <tr
                        key={ booking.id }
                        className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                      >
                        <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                          { booking.bookingCode }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.userEmail }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.locationName }
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          { booking.slotCode }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.vehicleNumber }
                        </td>

                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.durationHours } hr
                        </td>

                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          ৳{ booking.amount }
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={ getStatusLabel( booking.status ) } />
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={ () => setSelectedBooking( booking ) }
                              className="cursor-pointer text-blue-500 transition hover:scale-110"
                            >
                              <Eye size={ 16 } />
                            </button>

                            { booking.status !== "COMPLETED" &&
                              booking.status !== "CANCELLED" && (
                                <button
                                  type="button"
                                  disabled={ actionId === booking.id }
                                  onClick={ () => handleComplete( booking.id ) }
                                  className="cursor-pointer text-emerald-500 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <CalendarCheck size={ 16 } />
                                </button>
                              ) }

                            { booking.status !== "CANCELLED" &&
                              booking.status !== "COMPLETED" && (
                                <button
                                  type="button"
                                  disabled={ actionId === booking.id }
                                  onClick={ () => handleCancel( booking.id ) }
                                  className="cursor-pointer text-red-500 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Trash2 size={ 16 } />
                                </button>
                              ) }
                          </div>
                        </td>
                      </tr>
                    ) ) }
                  </tbody>
                </table>
              </div>
            </>
          ) }
        </section>
      </div>

      { selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Booking Details
              </h2>

              <button
                type="button"
                onClick={ () => setSelectedBooking( null ) }
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                <X size={ 20 } />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              { [
                [ "Booking", selectedBooking.bookingCode ],
                [ "User", selectedBooking.userEmail ],
                [ "Location", selectedBooking.locationName ],
                [ "Address", selectedBooking.locationAddress ],
                [ "Slot", selectedBooking.slotCode ],
                [ "Zone", selectedBooking.zone ],
                [ "Vehicle", selectedBooking.vehicleNumber ],
                [ "Duration", `${ selectedBooking.durationHours } hr` ],
                [ "Amount", `৳${ selectedBooking.amount }` ],
                [
                  "Start",
                  selectedBooking.startTime
                    ? new Date( selectedBooking.startTime ).toLocaleString()
                    : "N/A",
                ],
                [
                  "End",
                  selectedBooking.endTime
                    ? new Date( selectedBooking.endTime ).toLocaleString()
                    : "N/A",
                ],
              ].map( ( [ label, value ] ) => (
                <div key={ label } className="flex justify-between gap-5">
                  <span className="text-blue-600 dark:text-blue-300">
                    { label }
                  </span>
                  <span className="text-right font-bold text-slate-900 dark:text-white">
                    { value }
                  </span>
                </div>
              ) ) }

              <div className="flex justify-between">
                <span className="text-blue-600 dark:text-blue-300">
                  Status
                </span>
                <StatusBadge status={ getStatusLabel( selectedBooking.status ) } />
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default AdminBookingsPage;