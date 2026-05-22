import {CarFront, Flame} from "lucide-react";

export default function ParkingMap ({slots, onSelect}) {
  // 1. Heatmap Aggregation Computational Logic
  const total = slots.length || 1;
  const occupiedCount = slots.filter((s) => s.status === "Occupied").length;
  const densityPercentage = Math.round((occupiedCount / total) * 100);

  // Determine global thermal context color styling
  const getHeatmapStyle = (percentage) => {
    if (percentage > 75) return "bg-red-500/10 text-red-500 border-red-500/30";
    if (percentage > 40) return "bg-orange-500/10 text-orange-500 border-orange-500/30";
    return "bg-green-500/10 text-green-500 border-green-500/30";
  };

  // 2. Separate slots into architectural lanes for realistic structural display
  // Splitting rows into dynamic top rows and bottom rows based on odd/even index patterns
  const topLaneSlots = slots.filter((_, idx) => idx % 2 === 0);
  const bottomLaneSlots = slots.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="space-y-6">
      {/* Heatmap Sensor Data Row */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border ${getHeatmapStyle(densityPercentage)}`}>
        <div className="flex items-center gap-3">
          <Flame className={`h-5 w-5 ${densityPercentage > 50 ? 'animate-pulse' : ''}`} />
          <div>
            <p className="text-sm font-bold">Live Crowdedness Heatmap Status</p>
            <p className="text-xs opacity-80">
              {densityPercentage}% of bays filled. {densityPercentage > 70 ? "High search density zone." : "Easy structural parking availability."}
            </p>
          </div>
        </div>
        <div className="text-xl font-mono font-extrabold">{densityPercentage}%</div>
      </div>

      {/* Main Authentic Architecture Canvas */}
      <div className="p-6 bg-gray-100 dark:bg-gray-950 rounded-[24px] border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="min-w-[650px] space-y-8 relative">

          {/* TOP PARKING LANE ROW */}
          <div className="grid grid-cols-6 gap-3">
            {topLaneSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.status !== "Available"}
                onClick={() => onSelect(slot)}
                className={`relative group h-28 border-b-4 border-x-2 rounded-t-xl flex flex-col items-center justify-between p-3 transition-all ${slot.status === "Available"
                    ? "bg-white dark:bg-gray-900 border-x-gray-300 dark:border-x-gray-700 border-b-green-500 hover:bg-green-50/50 dark:hover:bg-green-950/20 cursor-pointer"
                    : "bg-red-100/70 dark:bg-red-950/20 border-x-gray-200 dark:border-x-gray-800 border-b-red-500 cursor-not-allowed"
                  }`}
              >
                <span className="text-xs font-mono font-bold text-gray-400">{slot.id}</span>
                <CarFront
                  size={32}
                  className={`${slot.status === "Available" ? "text-gray-300 dark:text-gray-700 group-hover:text-green-500" : "text-red-500"}`}
                />
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${slot.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-200 text-red-800"
                  }`}>
                  {slot.status === "Available" ? "Open" : "Full"}
                </span>
              </button>
            ))}
          </div>

          {/* ROADWAY SIMULATION ASPHALT LANE */}
          <div className="h-16 bg-gray-800 dark:bg-gray-900 rounded-xl relative flex items-center justify-center border-y-2 border-dashed border-yellow-400/60 shadow-inner">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-white/30 uppercase select-none">
              ← DRIVEWAY LANE — DO NOT BLOCK AREA →
            </span>
            {/* Soft pulsing structural thermal canvas overlay glow effect */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-20 mix-blend-screen ${densityPercentage > 60 ? 'bg-red-500 animate-pulse' : 'bg-transparent'
              }`} />
          </div>

          {/* BOTTOM PARKING LANE ROW */}
          <div className="grid grid-cols-6 gap-3">
            {bottomLaneSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.status !== "Available"}
                onClick={() => onSelect(slot)}
                className={`relative group h-28 border-t-4 border-x-2 rounded-b-xl flex flex-col items-center justify-between p-3 transition-all ${slot.status === "Available"
                    ? "bg-white dark:bg-gray-900 border-x-gray-300 dark:border-x-gray-700 border-t-green-500 hover:bg-green-50/50 dark:hover:bg-green-950/20 cursor-pointer"
                    : "bg-red-100/70 dark:bg-red-950/20 border-x-gray-200 dark:border-x-gray-800 border-t-red-500 cursor-not-allowed"
                  }`}
              >
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${slot.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-200 text-red-800"
                  }`}>
                  {slot.status === "Available" ? "Open" : "Full"}
                </span>
                <CarFront
                  size={32}
                  className={`${slot.status === "Available" ? "text-gray-300 dark:text-gray-700 group-hover:text-green-500" : "text-red-500"}`}
                />
                <span className="text-xs font-mono font-bold text-gray-400">{slot.id}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Map Legend Footer Block */}
      <div className="flex gap-4 items-center justify-center text-xs font-medium text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-white border border-gray-300 dark:bg-gray-900 rounded-sm" /> Available Bay
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-red-100 dark:bg-red-950/50 border border-red-400 rounded-sm" /> Occupied Bay
        </div>
      </div>
    </div>
  );
}