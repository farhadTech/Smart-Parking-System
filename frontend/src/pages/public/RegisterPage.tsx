import {
  Car,
  Eye,
  GitBranch,
  Lock,
  Mail,
  Moon,
  Phone,
  Rocket,
  Sun,
  User,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../features/auth/AuthContext";

import { useTheme } from "../../features/theme/ThemeContext";

import {
  loginWithGithub,
  loginWithGoogle,
  registerUser,
} from "../../services/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { saveAuth } = useAuth();

  const { isDark, toggleTheme } = useTheme();

  const [ fullName, setFullName ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ phone, setPhone ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] =
    useState( "" );

  const [ role, setRole ] = useState<
    "USER" | "ADMIN"
  >( "USER" );

  const [ accepted, setAccepted ] =
    useState( false );

  const [ error, setError ] = useState( "" );

  const canSubmit =
    fullName.trim() &&
    email.trim() &&
    phone.trim() &&
    password.trim() &&
    confirmPassword.trim() &&
    password === confirmPassword &&
    accepted;

  const redirectByRole = (
    userRole: "USER" | "ADMIN"
  ) => {
    if ( userRole === "ADMIN" ) {
      navigate( "/admin/dashboard" );
    } else {
      navigate( "/user/dashboard" );
    }
  };

  const handleDemoRegister = () => {
    saveAuth( {
      token:
        role === "ADMIN"
          ? "demo-admin-register-token"
          : "demo-user-register-token",

      user: {
        id: role === "ADMIN" ? 10 : 11,
        name: fullName || "Shaju Ahmed",
        email:
          email || "shaju@example.com",
        role,
      },
    } );

    redirectByRole( role );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError( "" );

    if ( password !== confirmPassword ) {
      setError(
        "Password and confirm password do not match."
      );
      return;
    }

    if ( !accepted ) {
      setError(
        "Please accept Terms & Conditions and Privacy Policy."
      );
      return;
    }

    try {
      const response = await registerUser( {
        fullName,
        email,
        password,
        role,
      } );

      saveAuth( response );

      redirectByRole( response.user.role );
    } catch {
      setError(
        "Backend is not connected yet. Use Demo Register for now."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        {/* LEFT */ }
        <div className="p-6 sm:p-8 md:p-12">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500">
                <Car
                  size={ 20 }
                  className="text-white"
                />
              </div>

              <h1 className="text-lg font-bold leading-5 text-blue-600 dark:text-blue-400">
                Smart
                <br />
                Parking
              </h1>
            </div>

            <button
              type="button"
              onClick={ toggleTheme }
              className="cursor-pointer rounded-full bg-slate-100 p-3 text-yellow-500 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
            >
              { isDark ? (
                <Sun size={ 18 } />
              ) : (
                <Moon size={ 18 } />
              ) }
            </button>
          </div>

          <h2 className="flex items-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
            Create account
            <Rocket
              size={ 28 }
              className="text-pink-500"
            />
          </h2>

          <p className="mt-2 text-slate-600 dark:text-blue-300">
            Register now to reserve parking
            slots, manage vehicles, and
            monitor availability in real
            time.
          </p>

          { error && (
            <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500 dark:text-red-400">
              { error }
            </div>
          ) }

          <form
            onSubmit={ handleSubmit }
            className="mt-6 space-y-4"
          >
            {/* FULL NAME */ }
            <div>
              <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
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
                    setFullName(
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* EMAIL */ }
            <div>
              <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <Mail
                  size={ 18 }
                  className="text-blue-500 dark:text-blue-300"
                />

                <input
                  type="email"
                  value={ email }
                  onChange={ ( event ) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* PHONE */ }
            <div>
              <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
                Phone Number
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <Phone
                  size={ 18 }
                  className="text-blue-500 dark:text-blue-300"
                />

                <input
                  value={ phone }
                  onChange={ ( event ) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* ROLE */ }
            <div>
              <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
                Register As
              </label>

              <select
                value={ role }
                onChange={ ( event ) =>
                  setRole(
                    event.target.value as
                    | "USER"
                    | "ADMIN"
                  )
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="USER">
                  User
                </option>

                <option value="ADMIN">
                  Admin
                </option>
              </select>
            </div>

            {/* PASSWORDS */ }
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Lock
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    type="password"
                    value={ password }
                    onChange={ ( event ) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                    placeholder="Password"
                  />

                  <Eye
                    size={ 16 }
                    className="text-blue-500 dark:text-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-700 dark:text-blue-300">
                  Confirm Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  <Lock
                    size={ 18 }
                    className="text-blue-500 dark:text-blue-300"
                  />

                  <input
                    type="password"
                    value={ confirmPassword }
                    onChange={ ( event ) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
                    placeholder="Confirm"
                  />

                  <Eye
                    size={ 16 }
                    className="text-blue-500 dark:text-blue-300"
                  />
                </div>
              </div>
            </div>

            {/* TERMS */ }
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700 dark:text-blue-300">
              <input
                type="checkbox"
                checked={ accepted }
                onChange={ ( event ) =>
                  setAccepted(
                    event.target.checked
                  )
                }
                className="mt-1"
              />

              <span>
                I agree to the{ " " }
                <span className="font-bold text-blue-500 dark:text-blue-400">
                  Terms & Conditions
                </span>{ " " }
                and{ " " }
                <span className="font-bold text-blue-500 dark:text-blue-400">
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* CREATE */ }
            <button
              type="submit"
              disabled={ !canSubmit }
              className={ `w-full rounded-2xl py-3 font-bold transition-all duration-300 ${ canSubmit
                  ? "cursor-pointer bg-blue-500 text-white hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
                  : "cursor-not-allowed bg-blue-500/50 text-white/60"
                }` }
            >
              Create Account
            </button>

            {/* DEMO */ }
            <button
              type="button"
              onClick={ handleDemoRegister }
              className="w-full cursor-pointer rounded-2xl border border-slate-300 bg-white py-3 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              Demo Register
            </button>
          </form>

          {/* DIVIDER */ }
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />

            <span className="text-sm text-slate-500 dark:text-blue-300">
              or
            </span>

            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-800" />
          </div>

          {/* SOCIAL */ }
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={ loginWithGoogle }
              className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-300 py-3 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            >
              <span className="font-bold text-red-400">
                G
              </span>
              Google
            </button>

            <button
              type="button"
              onClick={ loginWithGithub }
              className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-300 py-3 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            >
              <GitBranch size={ 18 } />
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-slate-600 dark:text-blue-300">
            Already have an account?{ " " }
            <Link
              to="/login"
              className="font-bold text-blue-500 dark:text-blue-400"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT */ }
        <div className="relative hidden bg-gradient-to-br from-blue-600 to-indigo-800 p-12 md:block">
          <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-bold text-white">
            Smart Parking Platform
          </span>

          <h2 className="mt-10 max-w-sm text-4xl font-bold leading-tight text-white">
            Join the future of smart parking
          </h2>

          <p className="mt-6 max-w-md text-lg text-blue-100">
            Create your account to reserve
            slots instantly, monitor parking
            spaces, and experience modern
            parking management with real-time
            technology.
          </p>

          <div className="absolute bottom-36 left-12 right-12 grid grid-cols-2 gap-5">
            { [
              [ "24/7", "Smart Monitoring" ],
              [ "500+", "Daily Users" ],
            ].map( ( [ value, label ] ) => (
              <div
                key={ label }
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <p className="text-3xl font-bold text-white">
                  { value }
                </p>

                <p className="mt-2 text-sm text-blue-100">
                  { label }
                </p>
              </div>
            ) ) }
          </div>

          <div className="absolute bottom-12 right-20 text-6xl">
            🚗
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;