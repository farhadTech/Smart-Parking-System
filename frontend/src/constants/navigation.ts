import {
  BarChart3,
  CalendarDays,
  Car,
  CreditCard,
  Gauge,
  LayoutDashboard,
  MapPin,
  Settings,
  ShieldAlert,
  User,
  Users,
  Wallet,
} from "lucide-react";

import { MessageCircle } from "lucide-react";

export const userNavigation = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Locations",
    path: "/user/locations",
    icon: MapPin,
  },

  {
    label: "Parking",
    path: "/user/parking",
    icon: Car,
  },

  {
    label: "Bookings",
    path: "/user/bookings",
    icon: CalendarDays,
  },

  {
    label: "Payments",
    path: "/user/payment",
    icon: Wallet,
  },

  {
    label: "Support",
    path: "/user/support",
    icon: MessageCircle,
  },

  {
    label: "Emergency",
    path: "/user/emergency",
    icon: ShieldAlert,
  },

  {
    label: "Profile",
    path: "/user/profile",
    icon: User,
  },

  {
    label: "Settings",
    path: "/user/settings",
    icon: Settings,
  },
];

export const adminNavigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Locations",
    path: "/admin/locations",
    icon: MapPin,
  },

  {
    label: "Parking",
    path: "/admin/parking",
    icon: Car,
  },

  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: CalendarDays,
  },

  {
    label: "Payments",
    path: "/admin/payment",
    icon: CreditCard,
  },

  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },

  {
    label: "Management",
    path: "/admin/management",
    icon: Users,
  },

  {
    label: "Support",
    path: "/admin/support",
    icon: MessageCircle,
  },
  
  {
    label: "Emergency",
    path: "/admin/emergency",
    icon: ShieldAlert,
  },

  {
    label: "Profile",
    path: "/admin/profile",
    icon: User,
  },

  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export const quickActions = [
  {
    label: "Book Parking",
    icon: Car,
    path: "/user/parking",
  },

  {
    label: "Reservations",
    icon: CalendarDays,
    path: "/user/bookings",
  },

  {
    label: "Payments",
    icon: Wallet,
    path: "/user/payment",
  },

  {
    label: "Analytics",
    icon: Gauge,
    path: "/admin/analytics",
  },

  {
    label: "Emergency",
    icon: ShieldAlert,
    path: "/user/emergency",
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/user/settings",
  },
];