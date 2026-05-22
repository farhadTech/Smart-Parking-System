import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../guards/ProtectedRoute";
import RoleRoute from "../guards/RoleRoute";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import OAuthCallbackPage from "../pages/public/OAuthCallbackPage";

import UserDashboard from "../pages/user/UserDashboard";
import UserLocationsPage from "../pages/user/UserLocationsPage";
import UserParkingPage from "../pages/user/UserParkingPage";
import UserBookingsPage from "../pages/user/UserBookingsPage";
import UserPaymentPage from "../pages/user/UserPaymentPage";
import UserEmergencyPage from "../pages/user/UserEmergencyPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingsPage from "../pages/user/UserSettingsPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminParkingPage from "../pages/admin/AdminParkingPage";
import AdminLocationsPage from "../pages/admin/AdminLocationsPage";
import AdminPaymentPage from "../pages/admin/AdminPaymentPage";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import AdminManagementPage from "../pages/admin/AdminManagementPage";
import AdminEmergencyPage from "../pages/admin/AdminEmergencyPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import UserSupportPage from "../pages/user/UserSupportPage";
import AdminSupportPage from "../pages/admin/AdminSupportPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PublicLayout /> }>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/oauth/callback" element={ <OAuthCallbackPage /> } />
        </Route>

        <Route element={ <ProtectedRoute /> }>
          <Route element={ <RoleRoute allowedRoles={ [ "USER" ] } /> }>
            <Route element={ <UserLayout /> }>
              <Route path="/user/dashboard" element={ <UserDashboard /> } />
              <Route path="/user/locations" element={ <UserLocationsPage /> } />
              <Route path="/user/parking" element={ <UserParkingPage /> } />
              <Route path="/user/bookings" element={ <UserBookingsPage /> } />
              <Route path="/user/payment" element={ <UserPaymentPage /> } />
              <Route path="/user/emergency" element={ <UserEmergencyPage /> } />
              <Route path="/user/profile" element={ <UserProfilePage /> } />
              <Route path="/user/settings" element={ <UserSettingsPage /> } />
              <Route path="/user/support" element={ <UserSupportPage /> } />
            </Route>
          </Route>

          <Route element={ <RoleRoute allowedRoles={ [ "ADMIN" ] } /> }>
            <Route element={ <AdminLayout /> }>
              <Route path="/admin/dashboard" element={ <AdminDashboard /> } />
              <Route path="/admin/locations" element={ <AdminLocationsPage /> } />
              <Route path="/admin/parking" element={ <AdminParkingPage /> } />
              <Route path="/admin/bookings" element={ <AdminBookingsPage /> } />
              <Route path="/admin/payment" element={ <AdminPaymentPage /> } />
              <Route path="/admin/analytics" element={ <AdminAnalyticsPage /> } />
              <Route path="/admin/management" element={ <AdminManagementPage /> } />
              <Route path="/admin/emergency" element={ <AdminEmergencyPage /> } />
              <Route path="/admin/profile" element={ <AdminProfilePage /> } />
              <Route path="/admin/settings" element={ <AdminSettingsPage /> } />
              <Route path="/admin/support" element={ <AdminSupportPage /> } />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
