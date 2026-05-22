import {
  useAuth,
} from "../context/AuthContext";

import Button from
  "../components/ui/Button";

export default function Profile () {
  const {user} =
    useAuth();

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800">

        <div className="flex flex-col md:flex-row gap-8 items-center">

          <img
            src="https://i.pravatar.cc/200"
            className="w-40 h-40 rounded-full object-cover"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-bold dark:text-white">
              {user?.name}
            </h1>

            <p className="text-gray-500 mt-3">
              {user?.email}
            </p>

            <div className="mt-6 flex gap-4 flex-wrap">

              <div className="bg-blue-100 text-blue-600 px-5 py-3 rounded-2xl">
                Premium User
              </div>

              <div className="bg-green-100 text-green-600 px-5 py-3 rounded-2xl">
                Verified
              </div>

            </div>

            <Button className="mt-8">
              Edit Profile
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}
