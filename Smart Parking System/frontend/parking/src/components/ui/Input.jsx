export default function Input ({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {/* Dynamic Accessible Label */}
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Shared Native Input Element */}
      <input
        className={`
          w-full h-12 px-4 rounded-2xl border bg-white dark:bg-gray-900
          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
          outline-none transition duration-200

          /* Visual Validation States */
          ${error
            ? "border-red-500 focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30"
            : "border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400"
          }

          /* User styling overrides */
          ${className}
        `}
        {...props}
      />

      {/* Dynamic Error State Message */}
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}