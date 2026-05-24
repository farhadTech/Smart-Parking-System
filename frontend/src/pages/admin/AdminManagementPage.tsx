import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Car,
  CreditCard,
  Search,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";

import {
  deleteAdminUser,
  getAdminBookings,
  getAdminLocationSlots,
  getAdminParkingLocations,
  getAdminPayments,
  getAdminUsers,
  updateAdminSlotStatus,
  type AdminUserResponse,
} from "../../services/admin.api";

import type {
  ParkingLocationResponse,
  ParkingSlotResponse,
  SlotStatus,
} from "../../services/location.api";

import type { BookingResponse } from "../../services/booking.api";
import type { PaymentResponse } from "../../services/payment.api";

type ManagementType = "users" | "parking" | "bookings" | "payments";

const slotStatuses: SlotStatus[] = [
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "MAINTENANCE",
];

const AdminManagementPage = () => {
  const [ activeType, setActiveType ] = useState<ManagementType>( "users" );
  const [ search, setSearch ] = useState( "" );
  const [ loading, setLoading ] = useState( true );

  const [ users, setUsers ] = useState<AdminUserResponse[]>( [] );
  const [ locations, setLocations ] = useState<ParkingLocationResponse[]>( [] );
  const [ selectedLocationId, setSelectedLocationId ] = useState<number | null>(
    null
  );
  const [ slots, setSlots ] = useState<ParkingSlotResponse[]>( [] );
  const [ bookings, setBookings ] = useState<BookingResponse[]>( [] );
  const [ payments, setPayments ] = useState<PaymentResponse[]>( [] );

  const loadData = async () => {
    try {
      setLoading( true );

      const [ usersData, locationsData, bookingsData, paymentsData ] =
        await Promise.all( [
          getAdminUsers(),
          getAdminParkingLocations(),
          getAdminBookings(),
          getAdminPayments(),
        ] );

      setUsers( usersData );
      setLocations( locationsData );
      setBookings( bookingsData );
      setPayments( paymentsData );

      if ( locationsData.length > 0 ) {
        setSelectedLocationId( locationsData[ 0 ].id );
        const slotsData = await getAdminLocationSlots( locationsData[ 0 ].id );
        setSlots( slotsData );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load management data." );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    loadData();
  }, [] );

  const handleLocationChange = async ( locationId: number ) => {
    try {
      setSelectedLocationId( locationId );
      const data = await getAdminLocationSlots( locationId );
      setSlots( data );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to load slots." );
    }
  };

  const handleDeleteUser = async ( id: number ) => {
    try {
      await deleteAdminUser( id );
      toast.success( "User deleted." );
      setUsers( ( prev ) => prev.filter( ( user ) => user.id !== id ) );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to delete user." );
    }
  };

  const handleSlotStatusChange = async ( slotId: number, status: SlotStatus ) => {
    try {
      const updated = await updateAdminSlotStatus( slotId, status );

      setSlots( ( prev ) =>
        prev.map( ( slot ) => ( slot.id === slotId ? updated : slot ) )
      );

      toast.success( "Slot status updated." );
    } catch ( error ) {
      console.error( error );
      toast.error( "Failed to update slot." );
    }
  };

  const filteredUsers = useMemo( () => {
    return users.filter( ( user ) =>
      `${ user.name } ${ user.email } ${ user.role }`
        .toLowerCase()
        .includes( search.toLowerCase() )
    );
  }, [ users, search ] );

  const filteredSlots = useMemo( () => {
    return slots.filter( ( slot ) =>
      `${ slot.slotCode } ${ slot.zone } ${ slot.status } ${ slot.vehicleNumber || "" }`
        .toLowerCase()
        .includes( search.toLowerCase() )
    );
  }, [ slots, search ] );

  const filteredBookings = useMemo( () => {
    return bookings.filter( ( booking ) =>
      `${ booking.bookingCode } ${ booking.userEmail } ${ booking.locationName } ${ booking.slotCode } ${ booking.vehicleNumber } ${ booking.status }`
        .toLowerCase()
        .includes( search.toLowerCase() )
    );
  }, [ bookings, search ] );

  const filteredPayments = useMemo( () => {
    return payments.filter( ( payment ) =>
      `${ payment.transactionId } ${ payment.bookingCode } ${ payment.userEmail } ${ payment.locationName } ${ payment.method } ${ payment.status }`
        .toLowerCase()
        .includes( search.toLowerCase() )
    );
  }, [ payments, search ] );

  const cards = [
    {
      type: "users" as ManagementType,
      title: "Users",
      value: users.length,
      icon: Users,
    },
    {
      type: "parking" as ManagementType,
      title: "Parking Slots",
      value: slots.length,
      icon: Car,
    },
    {
      type: "bookings" as ManagementType,
      title: "Bookings",
      value: bookings.length,
      icon: CalendarDays,
    },
    {
      type: "payments" as ManagementType,
      title: "Payments",
      value: payments.length,
      icon: CreditCard,
    },
  ];

  return (
    <>
      <Topbar title="Management" />

      <div className="space-y-6 bg-slate-50 p-4 pb-24 dark:bg-slate-950 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Management
          </h1>
          <p className="text-blue-600 dark:text-blue-300">
            Admin control center connected to Spring Boot
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          { cards.map( ( item ) => {
            const Icon = item.icon;
            const active = activeType === item.type;

            return (
              <button
                key={ item.type }
                type="button"
                onClick={ () => {
                  setActiveType( item.type );
                  setSearch( "" );
                } }
                className={ `cursor-pointer rounded-2xl border p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 ${ active
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  }` }
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Icon size={ 24 } />
                </div>

                <p className="text-sm text-blue-600 dark:text-blue-300">
                  { item.title }
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  { item.value }
                </h2>
              </button>
            );
          } ) }
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 lg:w-96">
              <Search size={ 18 } className="text-blue-500" />
              <input
                value={ search }
                onChange={ ( event ) => setSearch( event.target.value ) }
                placeholder="Search records..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
              />
            </div>

            { activeType === "parking" && (
              <select
                value={ selectedLocationId ?? "" }
                onChange={ ( event ) => handleLocationChange( Number( event.target.value ) ) }
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                { locations.map( ( location ) => (
                  <option key={ location.id } value={ location.id }>
                    { location.name }
                  </option>
                ) ) }
              </select>
            ) }
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          { loading ? (
            <div className="p-10 text-center font-semibold text-blue-500">
              Loading management data...
            </div>
          ) : (
            <>
              { activeType === "users" && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      { filteredUsers.map( ( user ) => (
                        <tr
                          key={ user.id }
                          className="border-t border-slate-200 dark:border-slate-800"
                        >
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                            { user.name }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { user.email }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { user.phone || "N/A" }
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500">
                              { user.role }
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={ () => handleDeleteUser( user.id ) }
                              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/20"
                            >
                              <Trash2 size={ 15 } />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ) ) }
                    </tbody>
                  </table>
                </div>
              ) }

              { activeType === "parking" && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                      <tr>
                        <th className="px-6 py-4">Slot</th>
                        <th className="px-6 py-4">Zone</th>
                        <th className="px-6 py-4">Vehicle</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Change Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      { filteredSlots.map( ( slot ) => (
                        <tr
                          key={ slot.id }
                          className="border-t border-slate-200 dark:border-slate-800"
                        >
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                            { slot.slotCode }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { slot.zone }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { slot.vehicleNumber || "N/A" }
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500">
                              { slot.status }
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={ slot.status }
                              onChange={ ( event ) =>
                                handleSlotStatusChange(
                                  slot.id,
                                  event.target.value as SlotStatus
                                )
                              }
                              className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            >
                              { slotStatuses.map( ( status ) => (
                                <option key={ status } value={ status }>
                                  { status }
                                </option>
                              ) ) }
                            </select>
                          </td>
                        </tr>
                      ) ) }
                    </tbody>
                  </table>
                </div>
              ) }

              { activeType === "bookings" && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left text-sm">
                    <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                      <tr>
                        <th className="px-6 py-4">Booking</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Slot</th>
                        <th className="px-6 py-4">Vehicle</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      { filteredBookings.map( ( booking ) => (
                        <tr
                          key={ booking.id }
                          className="border-t border-slate-200 dark:border-slate-800"
                        >
                          <td className="px-6 py-4 font-bold text-blue-600">
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
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                            ৳{ booking.amount }
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500">
                              { booking.status }
                            </span>
                          </td>
                        </tr>
                      ) ) }
                    </tbody>
                  </table>
                </div>
              ) }

              { activeType === "payments" && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left text-sm">
                    <thead className="bg-slate-100 text-blue-600 dark:bg-slate-800/50 dark:text-blue-300">
                      <tr>
                        <th className="px-6 py-4">Transaction</th>
                        <th className="px-6 py-4">Booking</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Method</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      { filteredPayments.map( ( payment ) => (
                        <tr
                          key={ payment.id }
                          className="border-t border-slate-200 dark:border-slate-800"
                        >
                          <td className="px-6 py-4 font-bold text-blue-600">
                            { payment.transactionId }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { payment.bookingCode }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { payment.userEmail }
                          </td>
                          <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                            { payment.method }
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                            ৳{ payment.amount }
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-xl bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500">
                              { payment.status }
                            </span>
                          </td>
                        </tr>
                      ) ) }
                    </tbody>
                  </table>
                </div>
              ) }
            </>
          ) }
        </section>
      </div>
    </>
  );
};

export default AdminManagementPage;
