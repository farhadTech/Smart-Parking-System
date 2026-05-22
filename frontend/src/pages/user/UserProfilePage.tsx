import { useRef, useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Shield,
  User,
  MapPin,
  Car,
  Save,
} from "lucide-react";

import toast from "react-hot-toast";

import Topbar from "../../components/layout/Topbar";
import { useAuth } from "../../features/auth/AuthContext";

import {
  cardStyle,
  pageStyle,
  titleStyle,
  mutedTextStyle,
  inputStyle,
  buttonStyle,
  statCardStyle,
} from "../../styles/theme";

const UserProfilePage = () => {
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>( null );

  const [ profileImage, setProfileImage ] = useState<string | null>( null );

  const [ fullName, setFullName ] = useState(
    user?.name || "Shaju Ahmed"
  );

  const [ email, setEmail ] = useState(
    user?.email || "shaju@example.com"
  );

  const [ phone, setPhone ] = useState( "+880 1234 567890" );

  const [ address, setAddress ] = useState(
    "Dhaka, Bangladesh"
  );

  const [ vehicleNumber, setVehicleNumber ] =
    useState( "DHK-1234" );

  const [ vehicleType, setVehicleType ] =
    useState( "Car" );

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[ 0 ];

    if ( !file ) return;

    const imageUrl = URL.createObjectURL( file );

    setProfileImage( imageUrl );

    toast.success( "Profile image updated" );
  };

  const handleSave = () => {
    toast.success( "Profile updated successfully" );
  };

  return (
    <>
      <Topbar title="Profile" />

      <div className={ pageStyle }>
        {/* Header */ }
        <div>
          <h1 className={ `text-3xl font-bold ${ titleStyle }` }>
            Profile
          </h1>

          <p className={ `mt-2 ${ mutedTextStyle }` }>
            Manage your personal information, vehicle,
            and account settings
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Left */ }
          <div className={ `${ cardStyle } p-6` }>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */ }
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 bg-slate-100 text-5xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
                  { profileImage ? (
                    <img
                      src={ profileImage }
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    fullName.charAt( 0 ).toUpperCase()
                  ) }
                </div>

                <button
                  type="button"
                  onClick={ () =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 active:scale-[0.96]"
                >
                  <Camera size={ 18 } />
                </button>

                <input
                  ref={ fileInputRef }
                  type="file"
                  accept="image/*"
                  onChange={ handleImageUpload }
                  className="hidden"
                />
              </div>

              <h2
                className={ `mt-5 text-2xl font-bold ${ titleStyle }` }
              >
                { fullName }
              </h2>

              <p className={ mutedTextStyle }>
                { email }
              </p>

              <div className="mt-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-bold text-blue-600 dark:text-blue-300">
                { user?.role || "USER" } Account
              </div>
            </div>

            {/* Stats */ }
            <div className="mt-8 space-y-4">
              <div className={ `${ statCardStyle } p-4` }>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Bookings
                </p>

                <p
                  className={ `mt-1 text-2xl font-bold ${ titleStyle }` }
                >
                  12
                </p>
              </div>

              <div className={ `${ statCardStyle } p-4` }>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Saved Vehicles
                </p>

                <p
                  className={ `mt-1 text-2xl font-bold ${ titleStyle }` }
                >
                  2
                </p>
              </div>

              <div className={ `${ statCardStyle } p-4` }>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment Status
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-500 dark:text-emerald-400">
                  Verified
                </p>
              </div>
            </div>
          </div>

          {/* Right */ }
          <div className={ `${ cardStyle } p-6` }>
            {/* Personal Info */ }
            <h2
              className={ `mb-6 text-xl font-bold ${ titleStyle }` }
            >
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */ }
              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <User
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    value={ fullName }
                    onChange={ ( event ) =>
                      setFullName( event.target.value )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none dark:text-white"
                  />
                </div>
              </div>

              {/* Email */ }
              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Email
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Mail
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    value={ email }
                    onChange={ ( event ) =>
                      setEmail( event.target.value )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none dark:text-white"
                  />
                </div>
              </div>

              {/* Phone */ }
              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Phone
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Phone
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    value={ phone }
                    onChange={ ( event ) =>
                      setPhone( event.target.value )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none dark:text-white"
                  />
                </div>
              </div>

              {/* Address */ }
              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Address
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <MapPin
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    value={ address }
                    onChange={ ( event ) =>
                      setAddress( event.target.value )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle */ }
            <h2
              className={ `mb-6 mt-10 text-xl font-bold ${ titleStyle }` }
            >
              Vehicle Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Vehicle Number
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Car
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    value={ vehicleNumber }
                    onChange={ ( event ) =>
                      setVehicleNumber( event.target.value )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-blue-600 dark:text-blue-300">
                  Vehicle Type
                </label>

                <select
                  value={ vehicleType }
                  onChange={ ( event ) =>
                    setVehicleType( event.target.value )
                  }
                  className={ inputStyle }
                >
                  <option>Car</option>
                  <option>Motorbike</option>
                  <option>Microbus</option>
                  <option>Truck</option>
                  <option>EV Vehicle</option>
                </select>
              </div>
            </div>

            {/* Security */ }
            <h2
              className={ `mb-6 mt-10 text-xl font-bold ${ titleStyle }` }
            >
              Security
            </h2>

            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-800 dark:bg-slate-800">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500 dark:text-emerald-400">
                  <Shield />
                </div>

                <div className="flex-1">
                  <h3
                    className={ `font-bold ${ titleStyle }` }
                  >
                    Two-Factor Authentication
                  </h3>

                  <p
                    className={ `mt-1 text-sm ${ mutedTextStyle }` }
                  >
                    Add extra security to your account.
                  </p>
                </div>

                <button
                  type="button"
                  className="cursor-pointer rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                >
                  Enable
                </button>
              </div>
            </div>

            {/* Save */ }
            <button
              type="button"
              onClick={ handleSave }
              className={ `mt-8 flex w-full items-center justify-center gap-2 ${ buttonStyle }` }
            >
              <Save size={ 18 } />
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfilePage;