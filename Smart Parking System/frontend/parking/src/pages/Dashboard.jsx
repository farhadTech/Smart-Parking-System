import shajuImg from '../assets/Shaju.jpeg';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParking} from "../context/ParkingContext";
import MapModal from "../components/parking/MapModal";
import OccupancyCard from "../components/dashboard/OccupancyCard";

import {
  Search,
  MapPinned,
  CreditCard,
  History,
  ShieldAlert,
  MessageSquareText,
  CarFront,
} from "lucide-react";

export default function Dashboard () {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {slots, reservations} = useParking();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Premium Live Real-Time Clock Feature
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic time-based greeting calculation
  const hour = time.getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

  // Re-calculated to dynamically map for the OccupancyCard requirements
  const occupied = slots.filter((slot) => slot.status === "Occupied").length;
  const available = slots.filter((s) => s.status === "Available").length;

  // Search autocomplete dataset
  const parkingAreas = [
    "Bashundhara City",
    "Jamuna Future Park",
    "UIU Parking",
    "Dhanmondi Parking",
  ];

  const filteredAreas = parkingAreas.filter((area) =>
    area.toLowerCase().includes(search.toLowerCase())
  );

  // Structural feature maps with internal route targets
  const features = [
    {
      title: "Book Parking",
      description: "Find and reserve parking spots",
      icon: <CarFront className="text-blue-600 dark:text-blue-400" />,
      color: "bg-blue-100 dark:bg-blue-950/50",
      path: "/parking-slots",
    },
    {
      title: "Reservations",
      description: "Manage your parking bookings",
      icon: <MapPinned className="text-green-600 dark:text-green-400" />,
      color: "bg-green-100 dark:bg-green-950/50",
      path: "/reservations",
    },
    {
      title: "Pricing",
      description: "View parking price details",
      icon: <CreditCard className="text-purple-600 dark:text-purple-400" />,
      color: "bg-purple-100 dark:bg-purple-950/50",
      path: "/analytics",
    },
    {
      title: "History",
      description: "Check parking history",
      icon: <History className="text-orange-600 dark:text-orange-400" />,
      color: "bg-orange-100 dark:bg-orange-950/50",
      path: "/reservations",
    },
    {
      title: "Emergency",
      description: "Emergency support access",
      icon: <ShieldAlert className="text-red-600 dark:text-red-400" />,
      color: "bg-red-100 dark:bg-red-950/50",
      path: "/emergency",
    },
    {
      title: "Feedback",
      description: "Share your experience",
      icon: <MessageSquareText className="text-cyan-600 dark:text-cyan-400" />,
      color: "bg-cyan-100 dark:bg-cyan-950/50",
      path: "/parking-management",
    },
  ];

  // Callback execution handler for selecting a bay out of our Modal view
  const handleSelectSlotFromModal = (slot) => {
    setIsMapModalOpen(false);
    // Directly routes them to confirm selected data cleanly
    navigate("/parking-slots", {state: {autoSelectSlotId: slot.id}});
  };

  return (
    <div className="space-y-8">

      {/* Premium Glassmorphic Welcome Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="absolute right-6 bottom-0 opacity-10 text-[260px] font-black select-none pointer-events-none leading-none">
          P
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={shajuImg}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-md flex-shrink-0"
              alt="Shaju profile"
            />

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                {greeting}
              </h1>

              <h2 className="text-2xl mt-1 font-medium text-white/90">
                Shaju
              </h2>

              <p className="text-blue-100/80 mt-0.5 text-sm">
                shaju@example.com
              </p>

              {/* Real-time Clock View */}
              <div className="mt-4 text-blue-50 font-mono text-lg font-semibold bg-black/10 px-4 py-1.5 rounded-xl inline-block border border-white/5">
                {time.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 justify-between w-full lg:w-auto">
            <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm">
              xyz 789 (R15, Yamaha)
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <img
                src={shajuImg}
                className="w-[140px] h-[90px] object-cover rounded-xl border border-white/20 shadow-sm"
                alt="Profile frame context"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Occupancy Tracking Presentation UI */}
      <OccupancyCard
        occupied={occupied}
        total={slots.length}
      />

      {/* Vehicle Information Card */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
              Registered Vehicle
            </p>

            <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
              Yamaha R15 V4
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              License Plate: <span className="text-gray-900 dark:text-gray-200 font-mono tracking-wide">DHAKA METRO X-12345</span>
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-5 py-3 rounded-2xl font-semibold text-sm tracking-wide">
              Active
            </div>

            <div className="bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 px-5 py-3 rounded-2xl font-semibold text-sm tracking-wide">
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Smart Search Controller Wrapper */}
      <div className="relative">
        <div className="bg-white dark:bg-gray-900 rounded-2xl h-16 px-5 flex items-center gap-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <Search className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />
          <input
            type="text"
            placeholder="Search parking area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-full outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
          />
        </div>

        {/* Autocomplete Droplist Overlay */}
        {search && (
          <div className="absolute z-30 w-full mt-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl transition-colors divide-y divide-gray-50 dark:divide-gray-800/60">
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <div
                  key={area}
                  onClick={() => {
                    setSearch(area);
                    setIsMapModalOpen(true); // Triggers visual map display instead of standard redirect
                  }}
                  className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-sm transition-colors"
                >
                  {area}
                </div>
              ))
            ) : (
              <div className="px-5 py-4 text-gray-400 dark:text-gray-500 text-sm">
                No matching locations found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Parking Card Container */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              City Center Garage P2
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Bashundhara City, Dhaka
            </p>

            <p className="text-gray-400 dark:text-gray-500 mt-5 text-sm font-medium">
              {available} out of {slots.length} spots available
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-5">
            <div className="bg-green-500 dark:bg-green-600 text-white px-5 py-2 rounded-full font-medium text-sm">
              {available} Free
            </div>

            <button
              onClick={() => setIsMapModalOpen(true)}
              className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors cursor-pointer text-white font-medium text-sm shadow-sm"
            >
              View Map
            </button>
          </div>
        </div>
      </div>

      {/* Features / Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Services
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Parking management features
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-2xl/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${feature.color}`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Booking Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Recent Bookings
          </h2>

          <button
            onClick={() => navigate("/reservations")}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer text-sm"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Booking ID</th>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Location</th>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Date</th>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Duration</th>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Amount</th>
                <th className="text-left p-5 text-gray-600 dark:text-gray-400 font-semibold text-sm">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors">
                <td className="p-5 font-semibold text-gray-900 dark:text-white text-sm">
                  #SP1234
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                  City Center Mall
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                  May 24, 2026
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300 text-sm">
                  2 Hours
                </td>
                <td className="p-5 text-gray-600 dark:text-gray-300 text-sm font-medium">
                  $2.50
                </td>
                <td className="p-5">
                  <span className="bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* OVERLAY MAP MODAL PORTAL */}
      <MapModal
        open={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        slots={slots}
        onSelectSlot={handleSelectSlotFromModal}
      />

    </div>
  );
}
