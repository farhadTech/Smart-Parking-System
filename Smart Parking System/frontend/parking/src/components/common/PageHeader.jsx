export default function PageHeader ({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0 w-full sm:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}
