import { Eye, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/layout/Topbar";
import StatusBadge from "../../components/common/StatusBadge";
import { cancelBooking, getBookings } from "../../services/booking.storage";
import { useAuth } from "../../features/auth/AuthContext";
import type { Booking } from "../../types/booking.types";
import toast from "react-hot-toast";

const UserBookingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const basePath = user?.role === "ADMIN" ? "/admin" : "/user";

  const [ bookings, setBookings ] = useState<Booking[]>( [] );
  const [ selectedBooking, setSelectedBooking ] = useState<Booking | null>( null );

  const loadBookings = () => {
    const allBookings = getBookings();

    if ( user?.role === "ADMIN" ) {
      setBookings( allBookings );
    } else {
      setBookings( allBookings.filter( ( booking ) => booking.userRole === "USER" ) );
    }
  };

  useEffect( () => {
    loadBookings();
  }, [] );

  const handleCancel = ( bookingId: string ) => {
    cancelBooking( bookingId );
    loadBookings();
    toast.success( "Booking cancelled successfully." );
  };

  const activeCount = bookings.filter( ( booking ) => booking.status === "Active" ).length;
  const upcomingCount = bookings.filter( ( booking ) => booking.status === "Upcoming" ).length;
  const completedCount = bookings.filter( ( booking ) => booking.status === "Completed" ).length;
  const cancelledCount = bookings.filter( ( booking ) => booking.status === "Cancelled" ).length;

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
            onClick={ () => navigate( `${ basePath }/locations` ) }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98] sm:w-fit"
          >
            <Plus size={ 18 } />
            New Reservation
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { [
            [ String( activeCount ), "Active", "text-emerald-500 dark:text-emerald-400" ],
            [ String( upcomingCount ), "Upcoming", "text-yellow-500 dark:text-yellow-400" ],
            [ String( completedCount ), "Completed", "text-blue-500 dark:text-blue-400" ],
            [ String( cancelledCount ), "Cancelled", "text-red-500 dark:text-red-400" ],
          ].map( ( [ value, label, color ] ) => (
            <div
              key={ label }
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className={ `text-3xl font-bold ${ color }` }>{ value }</p>
              <p className="text-sm text-blue-600 dark:text-blue-300">{ label }</p>
            </div>
          ) ) }
        </section>

        { bookings.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No bookings yet
            </h2>
            <p className="mt-2 text-blue-600 dark:text-blue-300">
              Create a new reservation from Locations.
            </p>

            <button
              type="button"
              onClick={ () => navigate( `${ basePath }/locations` ) }
              className="mt-6 cursor-pointer rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
            >
              New Reservation
            </button>
          </section>
        ) : (
          <>
            <section className="space-y-4 lg:hidden">
              { bookings.map( ( booking ) => (
                <div
                  key={ booking.id }
                  onClick={ () => setSelectedBooking( booking ) }
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        Booking ID
                      </p>
                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                        { booking.id }
                      </h3>
                    </div>

                    <StatusBadge status={ booking.status } />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Location</p>
                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        { booking.locationName }
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Slot</p>
                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        { booking.slot }
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Vehicle</p>
                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        { booking.vehicle }
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Duration</p>
                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        { booking.duration }
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Payment</p>
                      <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                        { booking.paymentMethod }
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Amount</p>
                      <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">
                        ৳{ booking.amount }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={ ( event ) => {
                        event.stopPropagation();
                        setSelectedBooking( booking );
                      } }
                      className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-600 active:scale-[0.98]"
                    >
                      <Eye size={ 16 } />
                      View
                    </button>

                    { booking.status !== "Cancelled" && (
                      <button
                        type="button"
                        onClick={ ( event ) => {
                          event.stopPropagation();
                          handleCancel( booking.id );
                        } }
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-500/20 active:scale-[0.98]"
                      >
                        <Trash2 size={ 16 } />
                        Cancel
                      </button>
                    ) }
                  </div>
                </div>
              ) ) }
            </section>

            <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/40 dark:text-blue-300">
                    <tr>
                      <th className="px-6 py-4">Booking ID</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Slot</th>
                      <th className="px-6 py-4">Vehicle</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { bookings.map( ( booking ) => (
                      <tr
                        key={ booking.id }
                        className="cursor-pointer border-t border-slate-200 transition-all duration-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                        onClick={ () => setSelectedBooking( booking ) }
                      >
                        <td className="px-6 py-4 text-blue-600 dark:text-blue-400">
                          { booking.id }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.locationName }
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                          { booking.slot }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.vehicle }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.duration }
                        </td>
                        <td className="px-6 py-4 text-slate-900 dark:text-white">
                          ৳{ booking.amount }
                        </td>
                        <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                          { booking.paymentMethod }
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={ booking.status } />
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={ ( event ) => {
                                event.stopPropagation();
                                setSelectedBooking( booking );
                              } }
                              className="cursor-pointer text-blue-500 transition hover:scale-110 hover:text-blue-400"
                            >
                              <Eye size={ 16 } />
                            </button>

                            { booking.status !== "Cancelled" && (
                              <button
                                type="button"
                                onClick={ ( event ) => {
                                  event.stopPropagation();
                                  handleCancel( booking.id );
                                } }
                                className="cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-400"
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
            </section>
          </>
        ) }
      </div>

      { selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                Booking Details
              </h2>

              <button
                type="button"
                onClick={ () => setSelectedBooking( null ) }
                className="cursor-pointer rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                <X size={ 20 } />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              { [
                [ "Booking ID", selectedBooking.id ],
                [ "Location", selectedBooking.locationName ],
                [ "Address", selectedBooking.locationAddress ],
                [ "Slot", selectedBooking.slot ],
                [ "Zone", selectedBooking.zone ],
                [ "Vehicle", selectedBooking.vehicle ],
                [ "Duration", selectedBooking.duration ],
                [ "Payment", selectedBooking.paymentMethod ],
                [ "Amount", `৳${ selectedBooking.amount }` ],
                [ "Created At", selectedBooking.createdAt ],
              ].map( ( [ label, value ] ) => (
                <div key={ label } className="flex justify-between gap-5">
                  <span className="text-blue-600 dark:text-blue-300">{ label }</span>
                  <span className="text-right font-bold text-slate-900 dark:text-white">
                    { value }
                  </span>
                </div>
              ) ) }

              <div className="flex justify-between">
                <span className="text-blue-600 dark:text-blue-300">Status</span>
                <StatusBadge status={ selectedBooking.status } />
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default UserBookingsPage;
