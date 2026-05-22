# Smart Parking System — Frontend Overview

## 1. Project Purpose

The frontend is a React + TypeScript smart parking management system with separate dashboards for users and admins.

It includes:

```txt
Public website
User dashboard
Admin dashboard
Parking locations
Slot booking
Payment simulation
Support ticket/chat system
Emergency support
Profile/settings
Dark/light theme
Responsive mobile navigation
```

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI library |
| TypeScript | Type-safe JavaScript |
| Vite | Development/build tool |
| Tailwind CSS | Styling and responsive design |
| React Router DOM | Routing/navigation |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |
| LocalStorage | Temporary frontend data storage |
| Google Maps package | Parking map integration/demo |

---

## 3. Current Architecture

Recommended project structure:

```txt
src/
  app/
    router.tsx
    providers.tsx

  components/
    common/
      ParkingMap.tsx
      StatCard.tsx
      StatusBadge.tsx
    layout/
      Sidebar.tsx
      Topbar.tsx

  constants/
    navigation.ts
    ParkingLocations.ts

  features/
    auth/
      AuthContext.tsx
    theme/
      ThemeContext.tsx

  guards/
    ProtectedRoute.tsx
    RoleRoute.tsx

  layouts/
    PublicLayout.tsx
    UserLayout.tsx
    AdminLayout.tsx

  pages/
    public/
      HomePage.tsx
      LoginPage.tsx
      RegisterPage.tsx
      OAuthCallbackPage.tsx
    user/
      UserDashboard.tsx
      UserLocationsPage.tsx
      UserParkingPage.tsx
      UserBookingsPage.tsx
      UserPaymentPage.tsx
      UserEmergencyPage.tsx
      UserSupportPage.tsx
      UserProfilePage.tsx
      UserSettingsPage.tsx
    admin/
      AdminDashboard.tsx
      AdminLocationsPage.tsx
      AdminParkingPage.tsx
      AdminBookingsPage.tsx
      AdminPaymentPage.tsx
      AdminAnalyticsPage.tsx
      AdminManagementPage.tsx
      AdminEmergencyPage.tsx
      AdminSupportPage.tsx
      AdminProfilePage.tsx
      AdminSettingsPage.tsx

  services/
    auth.service.ts
    booking.storage.ts
    payment.storage.ts
    support.storage.ts

  styles/
    theme.ts

  types/
    auth.types.ts
    booking.types.ts
    payment.types.ts
    support.types.ts
```

---

## 4. Authentication Overview

Current authentication is frontend/demo based.

### Current behavior

```txt
Login/Register saves token + user in localStorage
AuthContext reads token + user
ProtectedRoute checks if authenticated
RoleRoute checks USER or ADMIN
Logout clears localStorage
```

### Current roles

```txt
USER
ADMIN
```

### Future backend replacement

Later, replace demo auth with:

```txt
Spring Boot Authentication
JWT token
Refresh token
BCrypt password hashing
OAuth2 Google/GitHub login
```

---

## 5. Routing Overview

### Public routes

```txt
/
/login
/register
/oauth/callback
```

### User routes

```txt
/user/dashboard
/user/locations
/user/parking
/user/bookings
/user/payment
/user/emergency
/user/support
/user/profile
/user/settings
```

### Admin routes

```txt
/admin/dashboard
/admin/locations
/admin/parking
/admin/bookings
/admin/payment
/admin/analytics
/admin/management
/admin/emergency
/admin/support
/admin/profile
/admin/settings
```

---

## 6. Main Features

## User Features

### Dashboard

Shows:

```txt
Current time
Smart suggestion
Stats
Quick actions
Current booking
Notifications
```

### Locations

Shows:

```txt
Parking map
Area search
Availability stats
Location cards
Heat level
View available slots button
```

### Parking

Shows:

```txt
Slot filters
Slot visual map
Available/Occupied/Reserved/Maintenance slots
Selected slot details
Booking modal
Payment redirect
```

### Bookings

Shows:

```txt
Booking statistics
Mobile cards
Desktop table
Booking details modal
Cancel booking
```

### Payments

Shows:

```txt
Checkout mode
Payment history mode
CARD / bKash / Nagad methods
Payment records
Admin refund option
```

### Support

Shows:

```txt
Create ticket
Ticket stats
Chat-style conversation
Ticket status
User/admin messages
```

### Emergency

Shows:

```txt
Security call
Ambulance call
Fire department call
Vehicle breakdown support
Emergency contact list
```

### Profile

Shows:

```txt
Profile image upload
Personal information
Vehicle information
Security options
Save profile toast
```

### Settings

Shows:

```txt
Push notifications
SMS alerts
Auto-renewal
Email receipts
Two-factor authentication
Dark/light mode toggle
```

---

## 7. Admin Features

### Dashboard

Shows:

```txt
Admin overview
Revenue summary
Occupancy overview
Location status
Quick actions
Recent bookings
```

### Payments

Shows:

```txt
All user/admin payments
Revenue stats
Paid/refunded count
Refund option
Payment details
```

### Support

Shows:

```txt
All tickets
Search tickets
Filter by status
Reply to users
Mark Open/Pending/Urgent/Closed
```

### Analytics

Planned/partially built:

```txt
Revenue charts
Occupancy charts
Booking trends
Peak hours
User growth
```

### Management

Planned/partially built:

```txt
User management
Staff management
Vehicle management
Location management
System settings
```

---

## 8. State/Data Storage

Current temporary storage uses localStorage.

| Storage File | Purpose |
|---|---|
| `booking.storage.ts` | Saves/cancels bookings |
| `payment.storage.ts` | Saves/refunds payments |
| `support.storage.ts` | Saves tickets/messages |
| `AuthContext.tsx` | Saves token/user |
| `ThemeContext.tsx` | Saves theme preference |

This is good for frontend demo, but must be replaced with backend APIs later.

---

## 9. Theme System

Theme is controlled by:

```txt
features/theme/ThemeContext.tsx
```

It adds/removes this class on `<html>`:

```txt
dark
```

Tailwind classes use:

```txt
dark:bg-slate-950
dark:text-white
dark:border-slate-800
```

Reusable theme styles are stored in:

```txt
src/styles/theme.ts
```

---

## 10. Responsive Design

Main responsive strategy:

```txt
Desktop → sidebar + tables
Mobile  → bottom nav + cards + drawer menu
```

Examples:

```txt
Bookings: mobile cards, desktop table
Payments: mobile cards, desktop table
Support: mobile cards/chat modal
Sidebar: mobile bottom navigation + menu drawer
```

---

## 11. Backend Integration Plan

Next step is Spring Boot backend.

Build backend in this order:

```txt
1. Auth + Users
2. Locations
3. Parking Slots
4. Bookings
5. Payments
6. Support Tickets
7. Notifications
8. Analytics
9. AI service integration with FastAPI
```

Frontend services should later change from localStorage to API calls:

```txt
booking.storage.ts → booking.api.ts
payment.storage.ts → payment.api.ts
support.storage.ts → support.api.ts
auth.service.ts → real backend auth endpoints
```

---

## 12. Current Frontend Status

The frontend is ready for backend integration.

Completed:

```txt
Role-based UI
User/admin dashboards
Booking flow
Payment simulation
Support system
Dark/light theme
Responsive design
Mobile navigation
Toast notifications
Map concept
Emergency support
Profile/settings
```

Still frontend-only:

```txt
Authentication
Bookings
Payments
Support tickets
Parking availability
Analytics data
```

These should now be connected to Spring Boot and PostgreSQL.
