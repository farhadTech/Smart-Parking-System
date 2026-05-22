import {
  GoogleMap,
  Marker,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";

import { MapPin } from "lucide-react";
import { useTheme } from "../../features/theme/ThemeContext";

import type { ParkingLocation } from "../../constants/ParkingLocations";

type ParkingMapProps = {
  locations: ParkingLocation[];
  selectedLocationId?: string;
  onSelectLocation: ( location: ParkingLocation ) => void;
};

const libraries: never[] = [];

const containerStyle = {
  width: "100%",
  height: "420px",
};

const center = {
  lat: 23.7806,
  lng: 90.4193,
};

const getHeatColor = (
  level: ParkingLocation[ "heatLevel" ]
) => {
  if ( level === "High" ) return "#ef4444";
  if ( level === "Medium" ) return "#f59e0b";
  return "#10b981";
};

const darkMapStyles = [
  {
    elementType: "geometry",
    stylers: [ { color: "#0f172a" } ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [ { color: "#94a3b8" } ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [ { color: "#020617" } ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [ { color: "#1e293b" } ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [ { color: "#0c4a6e" } ],
  },
];

const ParkingMap = ( {
  locations,
  selectedLocationId,
  onSelectLocation,
}: ParkingMapProps ) => {
  const apiKey = import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  const { isDark } = useTheme();

  const { isLoaded } = useJsApiLoader( {
    googleMapsApiKey: apiKey || "",
    libraries,
  } );

  if ( !apiKey || !isLoaded ) {
    return (
      <div className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.12),transparent_28%),radial-gradient(circle_at_40%_80%,rgba(16,185,129,0.12),transparent_26%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.22),transparent_28%),radial-gradient(circle_at_40%_80%,rgba(16,185,129,0.2),transparent_26%)]" />

        <div className="relative z-10 p-5">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Parking Location Map
          </h2>

          <p className="text-sm text-slate-600 dark:text-blue-300">
            Add VITE_GOOGLE_MAPS_API_KEY to enable real Google Maps.
          </p>
        </div>

        { locations.map( ( location, index ) => {
          const positions = [
            "left-[22%] top-[35%]",
            "left-[62%] top-[30%]",
            "left-[48%] top-[67%]",
            "left-[78%] top-[62%]",
          ];

          const selected =
            selectedLocationId === location.id;

          return (
            <button
              key={ location.id }
              type="button"
              onClick={ () => onSelectLocation( location ) }
              className={ `absolute ${ positions[ index % positions.length ]
                } z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-4 py-3 text-left shadow-xl transition-all duration-300 hover:-translate-y-[55%] ${ selected
                  ? "border-blue-400 bg-blue-500 text-white"
                  : "border-slate-200 bg-white text-slate-900 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-950/90 dark:text-white"
                }` }
            >
              <div className="flex items-center gap-2">
                <MapPin size={ 18 } />
                <span className="font-bold">
                  { location.area }
                </span>
              </div>

              <p
                className={ `mt-1 text-xs ${ selected
                    ? "text-blue-100"
                    : "text-slate-500 dark:text-slate-400"
                  }` }
              >
                { location.availableSlots } available ·{ " " }
                { location.heatLevel } heat
              </p>
            </button>
          );
        } ) }
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
      <GoogleMap
        mapContainerStyle={ containerStyle }
        center={ center }
        zoom={ 12 }
        options={ {
          disableDefaultUI: false,
          backgroundColor: isDark
            ? "#020617"
            : "#f8fafc",
          styles: isDark ? darkMapStyles : [],
        } }
      >
        { locations.map( ( location ) => {
          const color = getHeatColor(
            location.heatLevel
          );

          return (
            <div key={ location.id }>
              <Circle
                center={ {
                  lat: location.lat,
                  lng: location.lng,
                } }
                radius={
                  location.heatLevel === "High"
                    ? 900
                    : location.heatLevel === "Medium"
                      ? 650
                      : 450
                }
                options={ {
                  fillColor: color,
                  fillOpacity: 0.25,
                  strokeColor: color,
                  strokeOpacity: 0.7,
                  strokeWeight: 2,
                } }
              />

              <Marker
                position={ {
                  lat: location.lat,
                  lng: location.lng,
                } }
                title={ `${ location.name } - ${ location.availableSlots } available` }
                onClick={ () =>
                  onSelectLocation( location )
                }
              />
            </div>
          );
        } ) }
      </GoogleMap>
    </div>
  );
};

export default ParkingMap;