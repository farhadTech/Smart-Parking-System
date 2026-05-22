import {motion} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function StatsCard ({
  title,
  value,
  icon,
  growth = "+12%",
  positive = true,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl dark:hover:shadow-2xl/10 transition-shadow duration-300"
    >

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-950 rounded-full blur-3xl opacity-30 group-hover:opacity-50 dark:group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

      {/* Top Section */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight">
            {value}
          </h3>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
          {icon}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex items-center gap-2 relative z-10">
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${positive
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
            }`}
        >
          {positive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {growth}
        </div>

        <span className="text-gray-400 dark:text-gray-500 text-sm">
          vs last month
        </span>
      </div>
    </motion.div>
  );
}
