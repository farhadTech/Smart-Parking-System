export default function Button ({
  children,
  variant = "primary",
  size = "md",          // Added a default size prop
  className = "",       // Allows custom style overrides
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
    danger:
      "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white",
    success:
      "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-xl",
    md: "h-12 px-6 rounded-2xl font-medium",
    lg: "h-14 px-8 text-lg rounded-[20px] font-semibold",
    icon: "h-12 w-12 rounded-2xl flex items-center justify-center", // For icon-only buttons
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        transition duration-200 active:scale-[0.98]
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant] || ""}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}