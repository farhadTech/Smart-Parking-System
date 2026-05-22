import {useState} from "react";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  CarFront,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {useAuth} from "../context/AuthContext";

export default function Login () {
  const navigate = useNavigate();

  const {login} = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name:
        formData.role === "admin"
          ? "Admin"
          : "Shaju",

      email: formData.email,

      role: formData.role,
    };

    login(user);

    navigate(
      formData.role === "admin"
        ? "/admin"
        : "/dashboard"
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 sm:px-8 lg:px-14 py-8">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
              <CarFront size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Smart Parking
              </h1>

              <p className="text-xs text-gray-400 mt-0.5">
                Smart parking management
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-8">

            <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 leading-tight">
              Welcome back 👋
            </h2>

            <p className="text-sm text-gray-500 mt-3 leading-6">
              Login to manage your reservations and parking activities in real time.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Role */}
            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Login As
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-blue-500 transition text-sm"
              >

                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>
            </div>

            {/* Email */}
            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center gap-3 focus-within:border-blue-500 transition">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>

              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center gap-3 focus-within:border-blue-500 transition">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-400"
                    />
                  )}

                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-500">

                <input type="checkbox" />

                Remember me
              </label>

              <button
                type="button"
                className="text-blue-600 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg shadow-blue-200">
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              className="w-full h-14 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-3 font-medium text-gray-700"
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />

              Continue with Google
            </button>

            {/* Register */}
            <div className="text-center text-sm text-gray-500 pt-2">

              Don&apos;t have an account?{" "}

              <Link
                to="/register"
                className="text-blue-600 font-semibold"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-10">

        {/* Blur Circle */}
        <div className="absolute top-20 right-20 w-[320px] h-[320px] rounded-full bg-blue-100 blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-lg">

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[40px] p-8">

            <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              Smart Parking System
            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
              Park smarter with modern technology
            </h1>

            <p className="mt-5 text-gray-500 leading-8 text-base">
              Book parking slots instantly, manage reservations, and monitor parking availability in real time with a modern smart parking experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="rounded-3xl bg-blue-50 p-5 border border-blue-100">

                <h3 className="text-3xl font-bold text-gray-900">
                  120+
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Parking Slots
                </p>
              </div>

              <div className="rounded-3xl bg-cyan-50 p-5 border border-cyan-100">

                <h3 className="text-3xl font-bold text-gray-900">
                  98%
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  User Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Car */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
          alt="car"
          className="absolute bottom-8 right-8 w-28 opacity-90"
        />
      </div>
    </div>
  );
}