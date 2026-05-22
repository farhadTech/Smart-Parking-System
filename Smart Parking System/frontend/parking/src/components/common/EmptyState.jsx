import {
  CircleParking,
} from "lucide-react";

export default function EmptyState ({
  title,
  description,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-12 text-center">

      <CircleParking
        size={60}
        className="mx-auto text-gray-300"
      />

      <h3 className="mt-6 text-2xl font-bold dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </div>
  );
}
