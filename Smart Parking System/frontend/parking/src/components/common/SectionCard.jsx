export default function SectionCard ({
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-8 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}