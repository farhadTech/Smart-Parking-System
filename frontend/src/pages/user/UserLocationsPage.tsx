import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, Search } from "lucide-react";

import Topbar from "../../components/layout/Topbar";
import ParkingMap from "../../components/common/ParkingMap";

import { useAuth } from "../../features/auth/AuthContext";

import {
  pageStyle,
  cardStyle,
  titleStyle,
  mutedTextStyle,
  inputStyle,
  buttonStyle,
} from "../../styles/theme";

import {
  getLocations,
  type ParkingLocationResponse,
} from "../../services/location.api";

const heatClass = {
  LOW: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",

  MEDIUM:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400",

  HIGH: "border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400",
};

const UserLocationsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const basePath = user?.role === "ADMIN" ? "/admin" : "/user";

  const [ search, setSearch ] = useState( "" );

  const [ locations, setLocations ] = useState<
    ParkingLocationResponse[]
  >( [] );

  const [ loading, setLoading ] = useState( true );

  const [ selectedLocation, setSelectedLocation ] =
    useState<ParkingLocationResponse | null>( null );

  useEffect( () => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();

        setLocations( data );

        if ( data.length > 0 ) {
          setSelectedLocation( data[ 0 ] );
        }
      } catch ( error ) {
        console.error( error );
      } finally {
        setLoading( false );
      }
    };

    fetchLocations();
  }, [] );

  const filteredLocations = useMemo( () => {
    return locations.filter( ( location ) => {
      const text =
        `${ location.name } ${ location.address } ${ location.area }`.toLowerCase();

      return text.includes( search.toLowerCase() );
    } );
  }, [ search, locations ] );

  const continueToSlots = () => {
    if ( !selectedLocation ) return;

    navigate( `${ basePath }/parking`, {
      state: {
        location: selectedLocation,
      },
    } );
  };

  if ( loading ) {
    return (
      <>
        <Topbar title="Locations" />

        <div className={ pageStyle }>
          <div className="flex items-center justify-center py-20">
            <div className="text-lg font-semibold text-blue-500">
              Loading locations...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Locations" />

      <div className={ pageStyle }>
        {/* Heading */ }
        <div>
          <h1 className={ `text-3xl font-bold ${ titleStyle }` }>
            Select Location
          </h1>

          <p className={ `mt-2 ${ mutedTextStyle }` }>
            Choose a nearby parking location from the map or list
          </p>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Left */ }
          <div className="space-y-6">
            <ParkingMap
              locations={ filteredLocations }
              selectedLocationId={ selectedLocation?.id || 0 }
              onSelectLocation={ setSelectedLocation }
            />

            {/* Stats */ }
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className={ `${ cardStyle } p-5` }>
                <p className={ `text-sm ${ mutedTextStyle }` }>
                  Locations
                </p>

                <h3 className={ `mt-2 text-3xl font-bold ${ titleStyle }` }>
                  { locations.length }
                </h3>
              </div>

              <div className={ `${ cardStyle } p-5` }>
                <p className={ `text-sm ${ mutedTextStyle }` }>
                  Available Slots
                </p>

                <h3 className="mt-2 text-3xl font-bold text-emerald-500 dark:text-emerald-400">
                  { locations.reduce(
                    ( total, location ) =>
                      total + location.availableSlots,
                    0
                  ) }
                </h3>
              </div>

              <div className={ `${ cardStyle } p-5` }>
                <p className={ `text-sm ${ mutedTextStyle }` }>
                  Occupied
                </p>

                <h3 className="mt-2 text-3xl font-bold text-red-500 dark:text-red-400">
                  { locations.reduce(
                    ( total, location ) =>
                      total + location.occupiedSlots,
                    0
                  ) }
                </h3>
              </div>

              <div className={ `${ cardStyle } p-5` }>
                <p className={ `text-sm ${ mutedTextStyle }` }>
                  Heatmap
                </p>

                <h3 className="mt-2 text-3xl font-bold text-yellow-500 dark:text-yellow-400">
                  Live
                </h3>
              </div>
            </div>
          </div>

          {/* Right */ }
          <div className="space-y-5">
            {/* Search */ }
            <div
              className={ `${ cardStyle } flex items-center gap-3 px-4 py-3` }
            >
              <Search
                size={ 18 }
                className="text-blue-500 dark:text-blue-300"
              />

              <input
                value={ search }
                onChange={ ( event ) =>
                  setSearch( event.target.value )
                }
                placeholder="Search location..."
                className={ `${ inputStyle } border-0 bg-transparent p-0 shadow-none` }
              />
            </div>

            {/* Location list */ }
            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1">
              { filteredLocations.map( ( location ) => {
                const selected =
                  selectedLocation?.id === location.id;

                return (
                  <button
                    key={ location.id }
                    type="button"
                    onClick={ () =>
                      setSelectedLocation( location )
                    }
                    className={ `w-full rounded-3xl border p-5 text-left transition-all duration-300 active:scale-[0.98] ${ selected
                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                        : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                      }` }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2
                          className={ `text-lg font-bold ${ titleStyle }` }
                        >
                          { location.name }
                        </h2>

                        <p
                          className={ `mt-1 flex items-center gap-2 text-sm ${ mutedTextStyle }` }
                        >
                          <MapPin size={ 15 } />
                          { location.address }
                        </p>
                      </div>

                      <span
                        className={ `rounded-full border px-3 py-1 text-xs font-bold ${ heatClass[
                          location.heatLevel as keyof typeof heatClass
                          ]
                          }` }
                      >
                        { location.heatLevel }
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
                        <p
                          className={ `text-xl font-bold ${ titleStyle }` }
                        >
                          { location.totalSlots }
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Total
                        </p>
                      </div>

                      <div className="rounded-2xl bg-emerald-500/10 p-3">
                        <p className="text-xl font-bold text-emerald-500 dark:text-emerald-400">
                          { location.availableSlots }
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Available
                        </p>
                      </div>

                      <div className="rounded-2xl bg-blue-500/10 p-3">
                        <p className="text-xl font-bold text-blue-500 dark:text-blue-400">
                          ৳{ location.pricePerHour }
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          / hour
                        </p>
                      </div>
                    </div>
                  </button>
                );
              } ) }
            </div>

            {/* Selected location */ }
            { selectedLocation && (
              <div className={ `${ cardStyle } p-5` }>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500 dark:text-blue-400">
                    <Car />
                  </div>

                  <div>
                    <h2 className={ `font-bold ${ titleStyle }` }>
                      { selectedLocation.name }
                    </h2>

                    <p className={ `text-sm ${ mutedTextStyle }` }>
                      { selectedLocation.distanceKm } km away
                    </p>
                  </div>
                </div>

                { user?.role === "ADMIN" && (
                  <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-500 dark:text-emerald-400">
                    Admin booking discount will apply during payment.
                  </div>
                ) }

                <button
                  type="button"
                  onClick={ continueToSlots }
                  className={ `w-full ${ buttonStyle }` }
                >
                  View Available Slots
                </button>
              </div>
            ) }
          </div>
        </section>
      </div>
    </>
  );
};

export default UserLocationsPage;