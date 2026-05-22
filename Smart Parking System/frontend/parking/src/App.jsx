import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {AuthProvider} from "./context/AuthContext";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";

import ParkingSlots from "./pages/ParkingSlots";
import Reservations from "./pages/Reservations";
import Emergency from "./pages/Emergency";
import ParkingManagement from "./pages/ParkingManagement";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/common/ProtectedRoute";

import BookingSummary from "./pages/BookingSummary";

import Payment from "./pages/Payment";

export default function App () {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Redirect Root */}
          <Route
            path="/"
            element={
              <Navigate to="/login" />
            }
          />

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Route>

          {/* USER ROUTES */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/parking-slots"
              element={<ParkingSlots />}
            />

            <Route
              path="/reservations"
              element={<Reservations />}
            />

            <Route
              path="/emergency"
              element={<Emergency />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/payment"
              element={<Payment />}
            />
            <Route
              path="/booking-summary"
              element={<BookingSummary />}
            />


          </Route>

          {/* ADMIN ROUTES */}
          <Route
            element={
              <ProtectedRoute adminOnly>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/parking-management"
              element={<ParkingManagement />}
            />

          </Route>

          {/* 404 PAGE */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}