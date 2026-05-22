-- ============================================================
-- Smart Parking Management System - Complete Population Script
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- Password for all users: password123 (hashed with bcrypt)
-- ============================================================
INSERT INTO users (name, email, phone, password, role) VALUES
-- Admins
('System Admin', 'admin@parking.com', '01700000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Parking Manager', 'manager@parking.com', '01700000001', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),

-- Drivers/Users
('Rahim Uddin', 'rahim@gmail.com', '01711111111', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Karim Ahmed', 'karim@gmail.com', '01722222222', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Fatima Begum', 'fatima@gmail.com', '01733333333', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Jamal Hossain', 'jamal@gmail.com', '01744444444', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Nasreen Akter', 'nasreen@gmail.com', '01755555555', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Mokbul Islam', 'mokbul@gmail.com', '01766666666', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Shirin Sultana', 'shirin@gmail.com', '01777777777', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Rafiq Mia', 'rafiq@gmail.com', '01788888888', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Salma Khatun', 'salma@gmail.com', '01799999999', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver'),
('Belal Khan', 'belal@gmail.com', '01812345678', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'driver');

-- ============================================================
-- 2. PARKING SLOTS TABLE
-- A1-A10 (Row A), B1-B10 (Row B), C1-C10 (Row C)
-- Emergency slots: A1, B1, C1 (higher price)
-- Mixed vehicle types: car, bike, bicycle
-- ============================================================
INSERT INTO parking_slots (slot_number, type, status, is_emergency, price_per_hour) VALUES
-- Row A
('A1', 'car', 'available', 1, 50.00),
('A2', 'car', 'occupied', 0, 20.00),
('A3', 'car', 'available', 0, 20.00),
('A4', 'car', 'reserved', 0, 20.00),
('A5', 'car', 'available', 0, 20.00),
('A6', 'bike', 'occupied', 0, 10.00),
('A7', 'bike', 'available', 0, 10.00),
('A8', 'bicycle', 'available', 0, 5.00),
('A9', 'bicycle', 'occupied', 0, 5.00),
('A10', 'car', 'available', 0, 20.00),

-- Row B
('B1', 'car', 'reserved', 1, 50.00),
('B2', 'car', 'available', 0, 20.00),
('B3', 'car', 'occupied', 0, 20.00),
('B4', 'car', 'available', 0, 20.00),
('B5', 'car', 'maintenance', 0, 20.00),
('B6', 'bike', 'available', 0, 10.00),
('B7', 'bike', 'occupied', 0, 10.00),
('B8', 'bicycle', 'available', 0, 5.00),
('B9', 'bicycle', 'available', 0, 5.00),
('B10', 'car', 'available', 0, 20.00),

-- Row C
('C1', 'car', 'available', 1, 50.00),
('C2', 'car', 'available', 0, 20.00),
('C3', 'car', 'available', 0, 20.00),
('C4', 'car', 'occupied', 0, 20.00),
('C5', 'car', 'available', 0, 20.00),
('C6', 'bike', 'available', 0, 10.00),
('C7', 'bike', 'reserved', 0, 10.00),
('C8', 'bicycle', 'available', 0, 5.00),
('C9', 'bicycle', 'maintenance', 0, 5.00),
('C10', 'car', 'available', 0, 20.00);

-- ============================================================
-- 3. BOOKINGS TABLE
-- Various booking statuses: active, completed, cancelled
-- ============================================================
INSERT INTO bookings (user_id, slot_id, vehicle_number, booking_time, start_time, end_time, total_cost, status) VALUES
-- Active Bookings (currently parked)
(3, 2, 'DHAKA-11-1234', '2026-01-16 09:00:00', '2026-01-16 10:00:00', '2026-01-16 14:00:00', 80.00, 'active'),
(4, 6, 'DHAKA-12-5678', '2026-01-16 10:30:00', '2026-01-16 11:00:00', '2026-01-16 13:00:00', 20.00, 'active'),
(5, 9, 'CTG-GA-9012', '2026-01-16 08:00:00', '2026-01-16 08:30:00', '2026-01-16 12:30:00', 20.00, 'active'),
(6, 13, 'DHAKA-13-3456', '2026-01-16 11:00:00', '2026-01-16 11:30:00', '2026-01-16 15:30:00', 80.00, 'active'),
(7, 17, 'DHAKA-14-7890', '2026-01-16 12:00:00', '2026-01-16 12:30:00', '2026-01-16 14:30:00', 20.00, 'active'),
(8, 24, 'SYL-KA-2345', '2026-01-16 09:30:00', '2026-01-16 10:00:00', '2026-01-16 14:00:00', 80.00, 'active'),

-- Reserved Bookings (upcoming)
(9, 4, 'DHAKA-15-6789', '2026-01-16 14:00:00', '2026-01-16 16:00:00', '2026-01-16 20:00:00', 80.00, 'active'),
(10, 11, 'DHAKA-16-0123', '2026-01-16 14:30:00', '2026-01-16 17:00:00', '2026-01-16 21:00:00', 200.00, 'active'),
(11, 27, 'RAJ-CHA-4567', '2026-01-16 15:00:00', '2026-01-16 18:00:00', '2026-01-16 22:00:00', 40.00, 'active'),

-- Completed Bookings (past)
(3, 3, 'DHAKA-11-1234', '2026-01-14 08:00:00', '2026-01-14 09:00:00', '2026-01-14 13:00:00', 80.00, 'completed'),
(4, 5, 'DHAKA-12-5678', '2026-01-14 10:00:00', '2026-01-14 11:00:00', '2026-01-14 15:00:00', 80.00, 'completed'),
(5, 7, 'CTG-GA-9012', '2026-01-14 09:00:00', '2026-01-14 09:30:00', '2026-01-14 11:30:00', 20.00, 'completed'),
(6, 8, 'DHAKA-13-3456', '2026-01-15 07:00:00', '2026-01-15 07:30:00', '2026-01-15 09:30:00', 10.00, 'completed'),
(7, 10, 'DHAKA-14-7890', '2026-01-15 12:00:00', '2026-01-15 12:30:00', '2026-01-15 16:30:00', 80.00, 'completed'),
(8, 12, 'SYL-KA-2345', '2026-01-15 14:00:00', '2026-01-15 14:30:00', '2026-01-15 18:30:00', 80.00, 'completed'),
(9, 14, 'DHAKA-15-6789', '2026-01-13 08:00:00', '2026-01-13 09:00:00', '2026-01-13 12:00:00', 60.00, 'completed'),
(10, 16, 'DHAKA-16-0123', '2026-01-13 11:00:00', '2026-01-13 12:00:00', '2026-01-13 14:00:00', 20.00, 'completed'),

-- Cancelled Bookings
(11, 18, 'RAJ-CHA-4567', '2026-01-12 09:00:00', '2026-01-12 10:00:00', '2026-01-12 14:00:00', 0.00, 'cancelled'),
(12, 19, 'DHAKA-17-8901', '2026-01-12 10:00:00', '2026-01-12 11:00:00', '2026-01-12 15:00:00', 0.00, 'cancelled');

-- ============================================================
-- 4. PAYMENTS TABLE
-- Various payment methods 
-- ============================================================
INSERT INTO payments (booking_id, payment_method, transaction_id, amount, payment_status) VALUES
-- Paid Payments (for completed bookings)
(10, 'bkash', 'BK20260114001', 80.00, 'paid'),
(11, 'nagad', 'NG20260114002', 80.00, 'paid'),
(12, 'cash', NULL, 20.00, 'paid'),
(13, 'rocket', 'RK20260115001', 10.00, 'paid'),
(14, 'card', 'CD20260115002', 80.00, 'paid'),
(15, 'bkash', 'BK20260115003', 80.00, 'paid'),
(16, 'nagad', 'NG20260113001', 60.00, 'paid'),
(17, 'cash', NULL, 20.00, 'paid'),

-- Pending Payments (for active bookings)
(1, 'bkash', NULL, 80.00, 'pending'),
(2, 'nagad', NULL, 20.00, 'pending'),
(3, 'cash', NULL, 20.00, 'pending'),
(4, 'rocket', NULL, 80.00, 'pending'),
(5, 'card', NULL, 20.00, 'pending'),
(6, 'bkash', NULL, 80.00, 'pending'),
(7, 'nagad', NULL, 80.00, 'pending'),
(8, 'cash', NULL, 200.00, 'pending'),
(9, 'bkash', NULL, 40.00, 'pending');

-- ============================================================
-- 5. VIOLATIONS TABLE
-- Common parking violations with fines
-- ============================================================
INSERT INTO violations (booking_id, violation_type, fine_amount, status) VALUES
-- Paid Violations
(10, 'Overtime Parking (exceeded 30 mins)', 50.00, 'paid'),
(11, 'Wrong Slot Type Usage', 100.00, 'paid'),
(14, 'Overtime Parking (exceeded 1 hour)', 100.00, 'paid'),

-- Unpaid Violations (pending fines)
(1, 'Improper Parking Position', 75.00, 'unpaid'),
(4, 'Blocking Emergency Exit', 200.00, 'unpaid'),
(6, 'Unauthorized Emergency Slot Usage', 150.00, 'unpaid'),
(15, 'Vehicle Left Overnight Without Permission', 300.00, 'unpaid'),
(16, 'Double Parking', 100.00, 'unpaid');

