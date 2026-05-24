import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Car,
  Clock,
  MapPin,
  Search,
  X,
} from "lucide-react";

import { useAuth } from "../../features/auth/AuthContext";

import type {
  ParkingLocationResponse,
  ParkingSlotResponse,
} from "../../services/location.api";

import {
  createBooking,
} from "../../services/booking.api";

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

type FilterStatus =
  | "All"
  | "AVAILABLE"
  | "OCCUPIED"
  | "RESERVED"
  | "MAINTENANCE";

const statusCardClass = {
  AVAILABLE:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",

  OCCUPIED:
    "border-red-500/40 bg-red-500/10 text-red-500 dark:text-red-400",

  RESERVED:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400",

  MAINTENANCE:
    "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

const filterItems: FilterStatus[] = [
  "All",
  "AVAILABLE",
  "OCCUPIED",
  "RESERVED",
  "MAINTENANCE",
];

const UserParkingPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useAuth();

  const basePath =
    user?.role === "ADMIN"
      ? "/admin"
      : "/user";

  const isAdmin = user?.role === "ADMIN";

  const selectedLocation = (
    location.state as {
      location?: ParkingLocationResponse;
    } | null
  )?.location;

  const [ selectedSlot, setSelectedSlot ] =
    useState<ParkingSlotResponse | null>( null );

  const [ bookingSlot, setBookingSlot ] =
    useState<ParkingSlotResponse | null>( null );

  const [ filter, setFilter ] =
    useState<FilterStatus>( "All" );

  const [ search, setSearch ] = useState( "" );

  const [ vehicle, setVehicle ] =
    useState( "" );

  const [ duration, setDuration ] =
    useState( "2" );

  const [ loading, setLoading ] =
    useState( false );

  const slots =
    selectedLocation?.slots || [];

  const filteredSlots = useMemo( () => {
    return slots.filter( ( slot ) => {
      const matchesStatus =
        filter === "All" ||
        slot.status === filter;

      const searchText =
        `${ slot.slotCode } ${ slot.zone } ${ slot.vehicleNumber || ""
          }`.toLowerCase();

      return (
        matchesStatus &&
        searchText.includes(
          search.toLowerCase()
        )
      );
    } );
  }, [ slots, filter, search ] );

  const pricePerHour =
    selectedLocation?.pricePerHour || 50;

  const subtotal =
    Number( duration ) * pricePerHour;

  const discountRate =
    isAdmin ? 0.2 : 0;

  const discountAmount =
    subtotal * discountRate;

  const amount =
    subtotal - discountAmount;

  const openBookingModal = (
    slot: ParkingSlotResponse
  ) => {
    setBookingSlot( slot );

    setVehicle( "" );

    setDuration( "2" );
  };

  const continueToPayment = async () => {
    if (
      !bookingSlot ||
      !vehicle.trim() ||
      !selectedLocation
    ) {
      return;
    }

    try {
      setLoading( true );

      const booking =
        await createBooking( {
          locationId:
            selectedLocation.id,

          slotId: bookingSlot.id,

          vehicleNumber: vehicle,

          durationHours:
            Number( duration ),
        } );

      navigate(
        `${ basePath }/payment`,
        {
          state: {
            booking,
          },
        }
      );
    } catch ( error ) {
      console.error( error );

      alert(
        "Booking failed. Please try again."
      );
    } finally {
      setLoading( false );
    }
  };

  return (
    <>
      <Topbar title="Parking" />

      <div className={ pageStyle }>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1
              className={ `text-3xl font-bold ${ titleStyle }` }
            >
              Parking Slots
            </h1>

            <p
              className={ `mt-1 flex items-center gap-2 ${ mutedTextStyle }` }
            >
              <MapPin size={ 17 } />

              { selectedLocation
                ? `${ selectedLocation.name } · ${ selectedLocation.address }`
                : "Please select a location first." }
            </p>
          </div>

          <button
            type="button"
            onClick={ () =>
              navigate(
                `${ basePath }/locations`
              )
            }
            className="cursor-pointer rounded-2xl border border-slate-300 px-5 py-3 font-bold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 active:scale-[0.98] dark:border-slate-700 dark:text-blue-300 dark:hover:text-white"
          >
            { selectedLocation
              ? "Change Location"
              : "Select Location" }
          </button>
        </div>

        { !selectedLocation && (
          <section className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h2 className="text-xl font-bold text-yellow-600 dark:text-yellow-300">
              Select a location first
            </h2>

            <button
              type="button"
              onClick={ () =>
                navigate(
                  `${ basePath }/locations`
                )
              }
              className={ `mt-5 ${ buttonStyle }` }
            >
              Go to Locations
            </button>
          </section>
        ) }

        { selectedLocation && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total"
                value={ String(
                  selectedLocation.totalSlots
                ) }
              />

              <StatCard
                title="Available"
                value={ String(
                  selectedLocation.availableSlots
                ) }
                color="green"
              />

              <StatCard
                title="Occupied"
                value={ String(
                  selectedLocation.occupiedSlots
                ) }
                color="red"
              />

              <StatCard
                title="Reserved"
                value={ String(
                  selectedLocation.reservedSlots
                ) }
                color="yellow"
              />
            </section>

            <section
              className={ `${ cardStyle } p-5` }
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 lg:w-96">
                  <Search
                    size={ 18 }
                    className="text-blue-500"
                  />

                  <input
                    value={ search }
                    onChange={ ( event ) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search slot..."
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  { filterItems.map(
                    ( item ) => (
                      <button
                        key={ item }
                        type="button"
                        onClick={ () =>
                          setFilter( item )
                        }
                        className={ `rounded-xl px-4 py-2 text-sm font-bold transition ${ filter === item
                            ? "bg-blue-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800"
                          }` }
                      >
                        { item }
                      </button>
                    )
                  ) }
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <div
                className={ `${ cardStyle } p-6` }
              >
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
                  { filteredSlots.map(
                    ( item ) => {
                      const active =
                        selectedSlot?.id ===
                        item.id;

                      return (
                        <button
                          key={ item.id }
                          type="button"
                          onClick={ () =>
                            setSelectedSlot(
                              item
                            )
                          }
                          className={ `flex h-32 items-center justify-center rounded-xl border transition-all duration-300 ${ statusCardClass[ item.status ] } ${ active
                              ? "ring-2 ring-blue-400"
                              : ""
                            }` }
                        >
                          <div>
                            <p className="text-2xl">
                              🚗
                            </p>

                            <p className="font-bold">
                              {
                                item.slotCode
                              }
                            </p>

                            <p className="text-xs">
                              {
                                item.status
                              }
                            </p>
                          </div>
                        </button>
                      );
                    }
                  ) }
                </div>
              </div>

              <div
                className={ `${ cardStyle } p-6` }
              >
                <h2
                  className={ `text-xl font-bold ${ titleStyle }` }
                >
                  Selected Slot
                </h2>

                { !selectedSlot ? (
                  <p
                    className={ `mt-4 text-sm ${ mutedTextStyle }` }
                  >
                    Click a slot to see
                    details.
                  </p>
                ) : (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
                      <p
                        className={ `text-sm ${ mutedTextStyle }` }
                      >
                        Slot
                      </p>

                      <h3
                        className={ `mt-1 text-3xl font-bold ${ titleStyle }` }
                      >
                        {
                          selectedSlot.slotCode
                        }
                      </h3>

                      <div className="mt-3">
                          <StatusBadge
                            status={
                              selectedSlot.status === "AVAILABLE"
                                ? "Available"
                                : selectedSlot.status === "OCCUPIED"
                                  ? "Occupied"
                                  : selectedSlot.status === "RESERVED"
                                    ? "Reserved"
                                    : "Maintenance"
                            }
                          />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>
                          Zone
                        </span>

                        <span className="font-bold">
                          {
                            selectedSlot.zone
                          }
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          Rate
                        </span>

                        <span className="font-bold">
                          ৳
                          {
                            pricePerHour
                          }
                          / hour
                        </span>
                      </div>
                    </div>

                    { selectedSlot.status ===
                      "AVAILABLE" ? (
                      <button
                        type="button"
                        onClick={ () =>
                          openBookingModal(
                            selectedSlot
                          )
                        }
                        className={ `flex w-full items-center justify-center gap-2 ${ buttonStyle }` }
                      >
                        <Car size={ 18 } />
                        Book This Slot
                      </button>
                    ) : (
                      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
                        This slot is
                        unavailable.
                      </div>
                    ) }
                  </div>
                ) }
              </div>
            </section>
          </>
        ) }
      </div>

      { bookingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h2
                className={ `text-2xl font-bold ${ titleStyle }` }
              >
                Book Parking Slot
              </h2>

              <button
                type="button"
                onClick={ () =>
                  setBookingSlot( null )
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={ vehicle }
                onChange={ ( event ) =>
                  setVehicle(
                    event.target.value
                  )
                }
                placeholder="Vehicle Number"
                className="w-full rounded-2xl border px-4 py-3"
              />

              <select
                value={ duration }
                onChange={ ( event ) =>
                  setDuration(
                    event.target.value
                  )
                }
                className="w-full rounded-2xl border px-4 py-3"
              >
                <option value="1">
                  1 Hour
                </option>
                <option value="2">
                  2 Hours
                </option>
                <option value="3">
                  3 Hours
                </option>
                <option value="4">
                  4 Hours
                </option>
              </select>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
              <div className="flex justify-between">
                <span>
                  Total Amount
                </span>

                <span className="text-2xl font-bold">
                  ৳{ amount }
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={
                !vehicle.trim() ||
                loading
              }
              onClick={
                continueToPayment
              }
              className="mt-6 w-full rounded-2xl bg-blue-500 py-3 font-bold text-white"
            >
              { loading
                ? "Creating Booking..."
                : "Confirm Booking" }
            </button>
          </div>
        </div>
      ) }
    </>
  );
};

export default UserParkingPage;
