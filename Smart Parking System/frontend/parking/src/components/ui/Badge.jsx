export default function Badge ({
  children,
  type = "success",
}) {
  const styles = {
    success:
      "bg-green-100 text-green-600",

    danger:
      "bg-red-100 text-red-500",

    warning:
      "bg-yellow-100 text-yellow-600",

    info:
      "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${styles[type]}`}
    >
      {children}
    </span>
  );
}