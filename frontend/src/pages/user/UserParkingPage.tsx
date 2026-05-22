import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Car, Clock, MapPin, Search, X } from "lucide-react";

import { useAuth } from "../../features/auth/AuthContext";

import type {
  ParkingLocation,
  ParkingSlot,
  SlotStatus,
} from "../../constants/ParkingLocations";

import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";

import {
  cardStyle,
  pageStyle,
  titleStyle,
  mutedTextStyle,
  buttonStyle,
} from "../../styles/theme";

type FilterStatus = "All" | SlotStatus;

const statusCardClass: Record<SlotStatus, string> = {
  Available:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
  Occupied:
    "border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400",
  Reserved:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400",
  Maintenance:
    "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

const filterItems: FilterStatus[] = [
  "All",
  "Available",
  "Occupied",
  "Reserved",
  "Maintenance",
];

const UserParkingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const basePath = user?.role === "ADMIN" ? "/admin" : "/user";
  const isAdmin = user?.role === "ADMIN";

  const selectedLocation = (
    location.state as { location?: ParkingLocation; } | null
  )?.location;

  const [ selectedSlot, setSelectedSlot ] = useState<ParkingSlot | null>( null );
  const [ bookingSlot, setBookingSlot ] = useState<ParkingSlot | null>( null );
  const [ filter, setFilter ] = useState<FilterStatus>( "All" );
  const [ search, setSearch ] = useState( "" );
  const [ vehicle, setVehicle ] = useState( "" );
  const [ duration, setDuration ] = useState( "2" );

  const slots: ParkingSlot[] = selectedLocation?.slots || [];

  const filteredSlots = useMemo( () => {
    return slots.filter( ( slot ) => {
      const matchesStatus = filter === "All" || slot.status === filter;
      const searchText =
        `${ slot.slot } ${ slot.zone } ${ slot.vehicle || "" }`.toLowerCase();

      return (
        matchesStatus && searchText.includes( search.toLowerCase() )
      );
    } );
  }, [ slots, filter, search ] );

  const pricePerHour = selectedLocation?.pricePerHour || 50;
  const subtotal = Number( duration ) * pricePerHour;
  const discountRate = isAdmin ? 0.2 : 0;
  const discountAmount = subtotal * discountRate;
  const amount = subtotal - discountAmount;

  const openBookingModal = ( slot: ParkingSlot ) => {
    setBookingSlot( slot );
    setVehicle( "" );
    setDuration( "2" );
  };

  const continueToPayment = () => {
    if ( !bookingSlot || !vehicle.trim() ) return;

    navigate( `${ basePath }/payment`, {
      state: {
        locationName: selectedLocation?.name || "Unknown Location",
        locationAddress: selectedLocation?.address || "Unknown Address",
        slot: bookingSlot.slot,
        zone: bookingSlot.zone,
        vehicle,
        duration: `${ duration } Hours`,
        amount,
        subtotal,
        discountRate,
        discountAmount,
        pricePerHour,
        role: user?.role || "USER",
      },
    } );
  };

  return (
    <>
      <Topbar title="Parking" />

      <div className={ pageStyle }>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className={ `text-3xl font-bold ${ titleStyle }` }>
              Parking Slots
            </h1>

            <p className={ `mt-1 flex items-center gap-2 ${ mutedTextStyle }` }>
              <MapPin size={ 17 } />
              { selectedLocation
                ? `${ selectedLocation.name } · ${ selectedLocation.address }`
                : "Please select a location first." }
            </p>
          </div>

          <button
            type="button"
            onClick={ () => navigate( `${ basePath }/locations` ) }
            className="cursor-pointer rounded-2xl border border-slate-300 px-5 py-3 font-bold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 active:scale-[0.98] dark:border-slate-700 dark:text-blue-300 dark:hover:text-white"
          >
            { selectedLocation ? "Change Location" : "Select Location" }
          </button>
        </div>

        { !selectedLocation && (
          <section className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h2 className="text-xl font-bold text-yellow-600 dark:text-yellow-300">
              Select a location first
            </h2>

            <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
              Parking slots depend on the selected location. Choose Gulshan,
              Banani, Dhanmondi, or Uttara to view available parking.
            </p>

            <button
              type="button"
              onClick={ () => navigate( `${ basePath }/locations` ) }
              className={ `mt-5 ${ buttonStyle }` }
            >
              Go to Locations
            </button>
          </section>
        ) }

        { isAdmin && selectedLocation && (
          <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
            Admin reservation mode is active. A 20% admin discount will be
            applied during payment.
          </section>
        ) }

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total"
            value={ String( selectedLocation?.totalSlots || 0 ) }
          />
          <StatCard
            title="Available"
            value={ String( selectedLocation?.availableSlots || 0 ) }
            color="green"
          />
          <StatCard
            title="Occupied"
            value={ String( selectedLocation?.occupiedSlots || 0 ) }
            color="red"
          />
          <StatCard
            title="Reserved"
            value={ String( selectedLocation?.reservedSlots || 0 ) }
            color="yellow"
          />
        </section>

        { selectedLocation && (
          <>
            <section className={ `${ cardStyle } p-5` }>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 lg:w-96">
                  <Search
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />
                  <input
                    value={ search }
                    onChange={ ( event ) => setSearch( event.target.value ) }
                    placeholder="Search slot, zone, vehicle..."
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  { filterItems.map( ( item ) => (
                    <button
                      key={ item }
                      type="button"
                      onClick={ () => setFilter( item ) }
                      className={ `cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 active:scale-[0.98] ${ filter === item
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700"
                        }` }
                    >
                      { item }
                    </button>
                  ) ) }
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <div className={ `${ cardStyle } p-6` }>
                <div className="mb-5 flex flex-wrap gap-4 text-sm">
                  <span className="text-emerald-500">● Available</span>
                  <span className="text-red-500">● Occupied</span>
                  <span className="text-yellow-500">● Reserved</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    ● Maintenance
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
                  { filteredSlots.map( ( item ) => {
                    const active = selectedSlot?.slot === item.slot;

                    return (
                      <button
                        key={ item.slot }
                        type="button"
                        onClick={ () => setSelectedSlot( item ) }
                        className={ `flex h-32 cursor-pointer items-center justify-center rounded-xl border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] ${ statusCardClass[ item.status ]
                          } ${ active ? "ring-2 ring-blue-400" : "" }` }
                      >
                        <div>
                          <p className="text-2xl">🚗</p>
                          <p className={ `font-bold ${ titleStyle }` }>
                            { item.slot }
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            { item.status }
                          </p>
                        </div>
                      </button>
                    );
                  } ) }
                </div>

                { filteredSlots.length === 0 && (
                  <div className={ `py-10 text-center ${ mutedTextStyle }` }>
                    No slots found for this filter.
                  </div>
                ) }
              </div>

              <div className={ `${ cardStyle } p-6` }>
                <h2 className={ `text-xl font-bold ${ titleStyle }` }>
                  Selected Slot
                </h2>

                { !selectedSlot ? (
                  <p className={ `mt-4 text-sm ${ mutedTextStyle }` }>
                    Click any slot from the visual map to see details.
                  </p>
                ) : (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
                      <p className={ `text-sm ${ mutedTextStyle }` }>Slot</p>

                      <h3 className={ `mt-1 text-3xl font-bold ${ titleStyle }` }>
                        { selectedSlot.slot }
                      </h3>

                      <div className="mt-3">
                        <StatusBadge status={ selectedSlot.status } />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      { [
                        [ "Zone", selectedSlot.zone ],
                        [ "Rate", `৳${ pricePerHour } / hour` ],
                      ].map( ( [ label, value ] ) => (
                        <div key={ label } className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">
                            { label }
                          </span>
                          <span className={ `font-bold ${ titleStyle }` }>
                            { value }
                          </span>
                        </div>
                      ) ) }

                      { isAdmin && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">
                            Admin Discount
                          </span>
                          <span className="font-bold text-emerald-500">
                            20%
                          </span>
                        </div>
                      ) }
                    </div>

                    { selectedSlot.status === "Available" ? (
                      <button
                        type="button"
                        onClick={ () => openBookingModal( selectedSlot ) }
                        className={ `flex w-full items-center justify-center gap-2 ${ buttonStyle }` }
                      >
                        <Car size={ 18 } />
                        Book This Slot
                      </button>
                    ) : (
                      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
                        This slot is not available for booking.
                      </div>
                    ) }
                  </div>
                ) }
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              { filteredSlots.map( ( item ) => (
                <div
                  key={ item.slot }
                  className={ `rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${ statusCardClass[ item.status ]
                    }` }
                >
                  <p className={ `text-sm ${ mutedTextStyle }` }>Slot</p>

                  <h2 className={ `text-2xl font-bold ${ titleStyle }` }>
                    { item.slot }
                  </h2>

                  <div className="mt-3">
                    <StatusBadge status={ item.status } />
                  </div>

                  { item.vehicle && (
                    <p className="mt-4 rounded-lg bg-black/5 px-3 py-2 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-300">
                      { item.vehicle }
                    </p>
                  ) }

                  { item.time && (
                    <p className={ `mt-2 flex items-center gap-1 text-xs ${ mutedTextStyle }` }>
                      <Clock size={ 13 } />
                      { item.time }
                    </p>
                  ) }

                  { item.status === "Available" && (
                    <button
                      type="button"
                      onClick={ () => openBookingModal( item ) }
                      className="mt-4 w-full cursor-pointer rounded-xl bg-blue-500 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                    >
                      Book Now
                    </button>
                  ) }
                </div>
              ) ) }
            </section>
          </>
        ) }
      </div>

      { bookingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className={ `text-2xl font-bold ${ titleStyle }` }>
                  Book Parking Slot
                </h2>
                <p className={ `text-sm ${ mutedTextStyle }` }>
                  Complete the details to continue payment
                </p>
              </div>

              <button
                type="button"
                onClick={ () => setBookingSlot( null ) }
                className="cursor-pointer rounded-full bg-slate-100 p-2 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white"
              >
                <X size={ 20 } />
              </button>
            </div>

            <div className="mb-6 rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
              { [
                [ "Location", selectedLocation?.name ],
                [ "Slot", bookingSlot.slot ],
                [ "Zone", bookingSlot.zone ],
                [ "Rate", `৳${ pricePerHour } / hour` ],
              ].map( ( [ label, value ] ) => (
                <div key={ label } className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400">
                    { label }
                  </span>
                  <span className={ `text-right font-bold ${ titleStyle }` }>
                    { value }
                  </span>
                </div>
              ) ) }

              { isAdmin && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400">
                    Admin Discount
                  </span>
                  <span className="font-bold text-emerald-500">20%</span>
                </div>
              ) }
            </div>

            <div className="space-y-4">
              <input
                value={ vehicle }
                onChange={ ( event ) => setVehicle( event.target.value ) }
                placeholder="Vehicle number, e.g. DHA-1234"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <select
                value={ duration }
                onChange={ ( event ) => setDuration( event.target.value ) }
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value="5">5 Hours</option>
              </select>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
              { isAdmin && (
                <>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-blue-600 dark:text-blue-300">
                      Subtotal
                    </span>
                    <span className={ `font-bold ${ titleStyle }` }>
                      ৳{ subtotal }
                    </span>
                  </div>

                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-blue-600 dark:text-blue-300">
                      Discount
                    </span>
                    <span className="font-bold text-emerald-500">
                      -৳{ discountAmount }
                    </span>
                  </div>
                </>
              ) }

              <div className="flex justify-between">
                <span className="text-blue-600 dark:text-blue-300">
                  Total Amount
                </span>
                <span className={ `text-2xl font-bold ${ titleStyle }` }>
                  ৳{ amount }
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={ !vehicle.trim() }
              onClick={ continueToPayment }
              className={ `mt-6 w-full rounded-2xl py-3 font-bold transition-all duration-300 ${ vehicle.trim()
                  ? "cursor-pointer bg-blue-500 text-white hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                  : "cursor-not-allowed bg-blue-500/40 text-white/50"
                }` }
            >
              Continue to Payment
            </button>
          </div>
        </div>
      ) }
    </>
  );
};

export default UserParkingPage;