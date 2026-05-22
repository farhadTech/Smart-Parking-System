import {useState} from "react";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  CarFront,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {useAuth} from "../context/AuthContext";

export default function Register () {
  const navigate = useNavigate();

  const {login} = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: formData.name,
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
              Create account 🚀
            </h2>

            <p className="text-sm text-gray-500 mt-3 leading-6">
              Register now to reserve parking slots, manage vehicles, and monitor availability in real time.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Full Name
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center gap-3 focus-within:border-blue-500 transition">

                <User
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
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

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Phone Number
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center gap-3 focus-within:border-blue-500 transition">

                <Phone
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Register As
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
                  placeholder="Enter password"
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

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Confirm Password
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center gap-3 focus-within:border-blue-500 transition">

                <Lock
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
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

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-gray-500">

              <input
                type="checkbox"
                required
                className="mt-1"
              />

              <span>
                I agree to the Terms &
                Conditions and Privacy Policy
              </span>
            </label>

            {/* Button */}
            <button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold shadow-lg shadow-blue-200">
              Create Account
            </button>

            {/* Google */}
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

            {/* Login */}
            <div className="text-center text-sm text-gray-500 pt-2">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-10">

        {/* Blur */}
        <div className="absolute top-20 right-20 w-[320px] h-[320px] rounded-full bg-blue-100 blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-lg">

          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[40px] p-8">

            <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              Smart Parking Platform
            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
              Join the future of smart parking
            </h1>

            <p className="mt-5 text-gray-500 leading-8 text-base">
              Create your account to reserve slots instantly, monitor parking spaces, and experience modern parking management with real-time technology.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="rounded-3xl bg-blue-50 p-5 border border-blue-100">
                <h3 className="text-3xl font-bold text-gray-900">
                  24/7
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Smart Monitoring
                </p>
              </div>

              <div className="rounded-3xl bg-cyan-50 p-5 border border-cyan-100">
                <h3 className="text-3xl font-bold text-gray-900">
                  500+
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Daily Users
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
