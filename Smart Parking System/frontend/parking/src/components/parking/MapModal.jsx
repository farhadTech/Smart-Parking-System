import {X, CarFront, Flame} from "lucide-react";

export default function MapModal ({open, onClose, slots, onSelectSlot}) {
  if (!open) return null;

  // Calculate live occupancy density metrics for the heatmap banner
  const total = slots?.length || 1;
  const occupiedCount = slots?.filter((s) => s.status === "Occupied").length || 0;
  const densityPercentage = Math.round((occupiedCount / total) * 100);

  // Split your spots evenly across parallel lanes to represent a real garage floor
  const topLaneSlots = slots ? slots.filter((_, idx) => idx % 2 === 0) : [];
  const bottomLaneSlots = slots ? slots.filter((_, idx) => idx % 2 !== 0) : [];

  const getHeatmapColorClass = (pct) => {
    if (pct > 75) return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50";
    if (pct > 40) return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50";
    return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900/50";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Garage Visual Floor Plan
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              Select an available bay layout to book directly
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/80 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1">

          {/* Dynamic Thermal Heatmap Indicator Banner */}
          <div className={`flex items-center justify-between p-4 rounded-2xl border ${getHeatmapColorClass(densityPercentage)}`}>
            <div className="flex items-center gap-3">
              <Flame className={`h-5 w-5 ${densityPercentage > 60 ? "animate-pulse" : ""}`} />
              <div>
                <p className="text-sm font-bold tracking-tight">Live Crowdedness Index</p>
                <p className="text-xs opacity-90 mt-0.5">
                  {densityPercentage}% of structural capacity filled. {densityPercentage > 70 ? "High grid saturation zone." : "Optimal bay vacancy available."}
                </p>
              </div>
            </div>
            <div className="text-xl font-mono font-black tracking-tighter">{densityPercentage}%</div>
          </div>

          {/* Core Layout Infrastructure Map */}
          <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-200/60 dark:border-gray-800/80 overflow-x-auto">
            <div className="min-w-[680px] space-y-8 relative">

              {/* TOP PARKING LANE (ROW A) */}
              <div className="grid grid-cols-6 gap-3">
                {topLaneSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.status !== "Available"}
                    onClick={() => onSelectSlot(slot)}
                    className={`group h-28 border-b-4 border-x-2 rounded-t-xl flex flex-col items-center justify-between p-3 transition-all ${slot.status === "Available"
                        ? "bg-white dark:bg-gray-900 border-x-gray-200 dark:border-x-gray-800 border-b-green-500 hover:bg-green-50/40 dark:hover:bg-green-950/10 cursor-pointer shadow-sm hover:shadow"
                        : "bg-red-50/60 dark:bg-red-950/10 border-x-gray-200 dark:border-x-gray-800/40 border-b-red-500 opacity-75 cursor-not-allowed"
                      }`}
                  >
                    <span className="text-xs font-mono font-bold text-gray-400">{slot.id}</span>
                    <CarFront
                      size={28}
                      className={`${slot.status === "Available" ? "text-gray-300 dark:text-gray-700 group-hover:text-green-500" : "text-red-500"}`}
                    />
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slot.status === "Available" ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                      }`}>
                      {slot.status === "Available" ? "Open" : "Full"}
                    </span>
                  </button>
                ))}
              </div>

              {/* SIMULATED CONCRETE DRIVEWAY ASPHALT */}
              <div className="h-14 bg-gray-800 dark:bg-gray-900 rounded-xl relative flex items-center justify-center border-y-2 border-dashed border-yellow-400/40 shadow-inner">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase select-none">
                  ← DRIVEWAY ZONE — DO NOT RESIDE OBSTRUCTIONS →
                </span>
              </div>

              {/* BOTTOM PARKING LANE (ROW B) */}
              <div className="grid grid-cols-6 gap-3">
                {bottomLaneSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.status !== "Available"}
                    onClick={() => onSelectSlot(slot)}
                    className={`group h-28 border-t-4 border-x-2 rounded-b-xl flex flex-col items-center justify-between p-3 transition-all ${slot.status === "Available"
                        ? "bg-white dark:bg-gray-900 border-x-gray-200 dark:border-x-gray-800 border-t-green-500 hover:bg-green-50/40 dark:hover:bg-green-950/10 cursor-pointer shadow-sm hover:shadow"
                        : "bg-red-50/60 dark:bg-red-950/10 border-x-gray-200 dark:border-x-gray-800/40 border-t-red-500 opacity-75 cursor-not-allowed"
                      }`}
                  >
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slot.status === "Available" ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                      }`}>
                      {slot.status === "Available" ? "Open" : "Full"}
                    </span>
                    <CarFront
                      size={28}
                      className={`${slot.status === "Available" ? "text-gray-300 dark:text-gray-700 group-hover:text-green-500" : "text-red-500"}`}
                    />
                    <span className="text-xs font-mono font-bold text-gray-400">{slot.id}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Map Descriptive Footer Legend */}
          <div className="flex gap-6 items-center justify-center text-xs font-semibold text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-white border border-gray-300 dark:bg-gray-900 border-b-green-500 rounded-sm" /> Available Spot
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-red-50 dark:bg-red-950/30 border border-gray-300 border-b-red-500 rounded-sm" /> Occupied / Reserved
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
