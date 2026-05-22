# Smart Parking System — Frontend Navigation Guide

## 1. Public Navigation

These pages are available before login.

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Landing page for the system |
| Login | `/login` | User/Admin login page |
| Register | `/register` | User/Admin registration page |
| OAuth Callback | `/oauth/callback` | Future Google/GitHub login callback |

### Public Flow

```txt
Home
→ Login / Register
→ Select role
→ Demo Login / Real Login later
→ Redirect based on role
```

After login:

```txt
USER  → /user/dashboard
ADMIN → /admin/dashboard
```

---

## 2. User Navigation

User routes are available only after login as `USER`.

| Feature | Route | Purpose |
|---|---|---|
| Dashboard | `/user/dashboard` | User overview, quick actions, current booking |
| Locations | `/user/locations` | Select parking area and view availability map |
| Parking | `/user/parking` | View slots, filter slots, book available slot |
| Bookings | `/user/bookings` | View booking history and cancel bookings |
| Payments | `/user/payment` | View payment history or complete checkout |
| Emergency | `/user/emergency` | Call emergency/security/medical/towing support |
| Support | `/user/support` | Create support tickets and chat with support |
| Profile | `/user/profile` | Manage personal and vehicle information |
| Settings | `/user/settings` | Manage notification, appearance, and security preferences |

### Recommended User Flow

```txt
Login as USER
→ Dashboard
→ Locations
→ Select location
→ Parking
→ Select available slot
→ Book Now
→ Payment
→ Pay
→ Bookings
→ View booking/payment history
```

### User Payment Flow

```txt
Locations
→ Parking
→ Book available slot
→ Payment page opens in checkout mode
→ Select CARD / bKash / Nagad
→ Pay
→ Booking saved
→ Payment saved
→ Redirect to Bookings
```

### User Support Flow

```txt
Support
→ New Ticket
→ Select category
→ Write message
→ Create ticket
→ Open ticket
→ Send replies
```

---

## 3. Admin Navigation

Admin routes are available only after login as `ADMIN`.

| Feature | Route | Purpose |
|---|---|---|
| Dashboard | `/admin/dashboard` | Admin control center overview |
| Locations | `/admin/locations` | View/manage parking locations |
| Parking | `/admin/parking` | View/manage slots and booking availability |
| Bookings | `/admin/bookings` | View all reservations |
| Payments | `/admin/payment` | View all payments, revenue, refunds |
| Analytics | `/admin/analytics` | View statistics, trends, charts, revenue |
| Management | `/admin/management` | Manage users, vehicles, staff, settings modules |
| Emergency | `/admin/emergency` | Manage emergency reports/support actions |
| Support | `/admin/support` | View/reply/close user support tickets |
| Profile | `/admin/profile` | Admin profile page |
| Settings | `/admin/settings` | Admin preferences and system settings |

### Recommended Admin Flow

```txt
Login as ADMIN
→ Admin Dashboard
→ Review stats
→ Check Bookings / Payments / Support
→ Manage parking slots
→ Review analytics
→ Handle support or emergency cases
```

### Admin Support Flow

```txt
Support
→ View all tickets
→ Filter by status
→ Open ticket
→ Reply to user
→ Mark Pending / Urgent / Closed
```

---

## 4. Mobile Navigation

On mobile, the sidebar becomes a bottom navigation bar.

Recommended visible mobile items:

```txt
Dashboard | Parking | Bookings | Support | Menu
```

The `Menu` drawer contains all remaining features:

```txt
Locations
Payments
Emergency
Profile
Settings
Logout
Admin-only: Analytics, Management
```

This avoids horizontal scrolling and keeps the interface clean.

---

## 5. Theme Navigation

Theme toggle is available in:

```txt
Public layout / Home page
Sidebar
Topbar
Settings page
Login page
Register page
```

Expected behavior:

```txt
Dark Mode  → dark backgrounds, white text
Light Mode → white/light backgrounds, dark readable text
```

Theme is saved in localStorage, so refresh should keep the selected mode.

---

## 6. Testing Checklist

### User Test

```txt
1. Open /login
2. Select USER
3. Click Demo Login
4. Confirm redirect to /user/dashboard
5. Go to Locations
6. Select location
7. Go to Parking
8. Book available slot
9. Complete payment
10. Confirm booking appears in Bookings
11. Confirm payment appears in Payments
12. Create support ticket
13. Test dark/light mode
```

### Admin Test

```txt
1. Open /login
2. Select ADMIN
3. Click Demo Login
4. Confirm redirect to /admin/dashboard
5. Check Payments page
6. Test refund
7. Check Support page
8. Reply to a user ticket
9. Mark ticket closed
10. Test mobile menu
```

---

## 7. Common Route Problems

If you see:

```txt
No routes matched location /dashboard
```

Use correct routes:

```txt
/user/dashboard
/admin/dashboard
```

Add safe redirect in router if needed:

```tsx
<Route path="/dashboard" element={<DashboardRedirect />} />
```

If Vite changes port:

```txt
5173 busy → Vite opens 5174
```

Use the port shown in terminal.
