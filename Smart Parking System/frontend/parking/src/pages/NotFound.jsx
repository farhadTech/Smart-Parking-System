import {Link} from "react-router-dom";

export default function NotFound () {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-6">

      <div className="text-center">

        <h1 className="text-[140px] font-bold text-blue-600 leading-none">
          404
        </h1>

        <h2 className="text-4xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex mt-8 px-6 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold items-center"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}