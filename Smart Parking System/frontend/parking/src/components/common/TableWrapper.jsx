export default function TableWrapper ({
  children,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden">

      <div className="overflow-x-auto">
        {children}
      </div>

    </div>
  );
}
