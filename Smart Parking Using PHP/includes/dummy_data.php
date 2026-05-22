<?php
/**
 * Dummy Data for Testing Without Database
 * Smart Parking Management System
 * 
 * This file provides sample data when DUMMY_MODE is enabled
 */

// Check if we're in dummy mode
function isDummyMode() {
    return isset($_SESSION['dummy_mode']) && $_SESSION['dummy_mode'] === true;
}

// Dummy Parking Slots
$dummySlots = [
    ['id' => 1, 'slot_number' => 'A1', 'type' => 'car', 'status' => 'available', 'is_emergency' => 1, 'price_per_hour' => 50.00],
    ['id' => 2, 'slot_number' => 'A2', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 3, 'slot_number' => 'A3', 'type' => 'car', 'status' => 'occupied', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 4, 'slot_number' => 'A4', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 5, 'slot_number' => 'A5', 'type' => 'car', 'status' => 'occupied', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 6, 'slot_number' => 'A6', 'type' => 'bike', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 10.00],
    ['id' => 7, 'slot_number' => 'A7', 'type' => 'bike', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 10.00],
    ['id' => 8, 'slot_number' => 'A8', 'type' => 'bicycle', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 5.00],
    ['id' => 9, 'slot_number' => 'A9', 'type' => 'bicycle', 'status' => 'maintenance', 'is_emergency' => 0, 'price_per_hour' => 5.00],
    ['id' => 10, 'slot_number' => 'A10', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 11, 'slot_number' => 'B1', 'type' => 'car', 'status' => 'available', 'is_emergency' => 1, 'price_per_hour' => 50.00],
    ['id' => 12, 'slot_number' => 'B2', 'type' => 'car', 'status' => 'occupied', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 13, 'slot_number' => 'B3', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 14, 'slot_number' => 'B4', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 15, 'slot_number' => 'B5', 'type' => 'car', 'status' => 'reserved', 'is_emergency' => 0, 'price_per_hour' => 20.00],
    ['id' => 16, 'slot_number' => 'B6', 'type' => 'bike', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 10.00],
    ['id' => 17, 'slot_number' => 'B7', 'type' => 'bike', 'status' => 'occupied', 'is_emergency' => 0, 'price_per_hour' => 10.00],
    ['id' => 18, 'slot_number' => 'B8', 'type' => 'bicycle', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 5.00],
    ['id' => 19, 'slot_number' => 'B9', 'type' => 'bicycle', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 5.00],
    ['id' => 20, 'slot_number' => 'B10', 'type' => 'car', 'status' => 'available', 'is_emergency' => 0, 'price_per_hour' => 20.00],
];

// Dummy Bookings
$dummyBookings = [
    [
        'id' => 1,
        'user_id' => 2,
        'slot_id' => 3,
        'vehicle_number' => 'DHAKA METRO 12-3456',
        'booking_time' => date('Y-m-d H:i:s', strtotime('-2 hours')),
        'start_time' => date('Y-m-d H:i:s', strtotime('-2 hours')),
        'end_time' => date('Y-m-d H:i:s', strtotime('+2 hours')),
        'total_cost' => 80.00,
        'status' => 'active',
        'user_name' => 'Demo Driver',
        'user_email' => 'driver@parking.com',
        'slot_number' => 'A3',
        'slot_type' => 'car',
        'payment_status' => 'pending',
        'payment_id' => 1
    ],
    [
        'id' => 2,
        'user_id' => 3,
        'slot_id' => 5,
        'vehicle_number' => 'DHAKA METRO 45-6789',
        'booking_time' => date('Y-m-d H:i:s', strtotime('-1 hour')),
        'start_time' => date('Y-m-d H:i:s', strtotime('-1 hour')),
        'end_time' => date('Y-m-d H:i:s', strtotime('+3 hours')),
        'total_cost' => 80.00,
        'status' => 'active',
        'user_name' => 'Test User',
        'user_email' => 'user@parking.com',
        'slot_number' => 'A5',
        'slot_type' => 'car',
        'payment_status' => 'paid',
        'payment_id' => 2
    ],
    [
        'id' => 3,
        'user_id' => 2,
        'slot_id' => 12,
        'vehicle_number' => 'DHAKA METRO 11-1111',
        'booking_time' => date('Y-m-d H:i:s', strtotime('-1 day')),
        'start_time' => date('Y-m-d H:i:s', strtotime('-1 day')),
        'end_time' => date('Y-m-d H:i:s', strtotime('-1 day +4 hours')),
        'total_cost' => 80.00,
        'status' => 'completed',
        'user_name' => 'Demo Driver',
        'user_email' => 'driver@parking.com',
        'slot_number' => 'B2',
        'slot_type' => 'car',
        'payment_status' => 'paid',
        'payment_id' => 3
    ]
];

// Dummy Payments
$dummyPayments = [
    ['id' => 1, 'booking_id' => 1, 'payment_method' => null, 'transaction_id' => null, 'amount' => 80.00, 'payment_status' => 'pending'],
    ['id' => 2, 'booking_id' => 2, 'payment_method' => 'bkash', 'transaction_id' => 'TXN123456', 'amount' => 80.00, 'payment_status' => 'paid'],
    ['id' => 3, 'booking_id' => 3, 'payment_method' => 'cash', 'transaction_id' => null, 'amount' => 80.00, 'payment_status' => 'paid'],
];

// Dummy Violations
$dummyViolations = [
    [
        'id' => 1,
        'booking_id' => 3,
        'violation_type' => 'Overtime Parking',
        'fine_amount' => 100.00,
        'status' => 'unpaid',
        'user_name' => 'Demo Driver',
        'user_email' => 'driver@parking.com',
        'vehicle_number' => 'DHAKA METRO 11-1111',
        'slot_number' => 'B2'
    ]
];

// Dummy Users
$dummyUsersList = [
    ['id' => 1, 'name' => 'System Admin', 'email' => 'admin@parking.com', 'phone' => '01700000000', 'role' => 'admin', 'created_at' => date('Y-m-d H:i:s', strtotime('-30 days')), 'booking_count' => 0, 'unpaid_fines' => 0],
    ['id' => 2, 'name' => 'Demo Driver', 'email' => 'driver@parking.com', 'phone' => '01711111111', 'role' => 'driver', 'created_at' => date('Y-m-d H:i:s', strtotime('-7 days')), 'booking_count' => 2, 'unpaid_fines' => 1],
    ['id' => 3, 'name' => 'Test User', 'email' => 'user@parking.com', 'phone' => '01722222222', 'role' => 'driver', 'created_at' => date('Y-m-d H:i:s', strtotime('-3 days')), 'booking_count' => 1, 'unpaid_fines' => 0],
];

// Helper function to get slot by ID
function getDummySlotById($id) {
    global $dummySlots;
    foreach ($dummySlots as $slot) {
        if ($slot['id'] == $id) {
            return $slot;
        }
    }
    return null;
}

// Helper function to get user's bookings
function getDummyUserBookings($userId) {
    global $dummyBookings;
    $result = [];
    foreach ($dummyBookings as $booking) {
        if ($booking['user_id'] == $userId) {
            $result[] = $booking;
        }
    }
    return $result;
}

// Helper function to get user's violations
function getDummyUserViolations($userId) {
    global $dummyViolations, $dummyBookings;
    $userBookingIds = [];
    foreach ($dummyBookings as $booking) {
        if ($booking['user_id'] == $userId) {
            $userBookingIds[] = $booking['id'];
        }
    }
    
    $result = [];
    foreach ($dummyViolations as $violation) {
        if (in_array($violation['booking_id'], $userBookingIds)) {
            $result[] = $violation;
        }
    }
    return $result;
}

// Stats calculations
function getDummyStats() {
    global $dummySlots, $dummyBookings, $dummyUsersList, $dummyViolations, $dummyPayments;
    
    $totalSlots = count($dummySlots);
    $occupiedSlots = count(array_filter($dummySlots, fn($s) => $s['status'] === 'occupied'));
    $availableSlots = count(array_filter($dummySlots, fn($s) => $s['status'] === 'available'));
    $activeBookings = count(array_filter($dummyBookings, fn($b) => $b['status'] === 'active'));
    $totalUsers = count(array_filter($dummyUsersList, fn($u) => $u['role'] === 'driver'));
    $unpaidViolations = count(array_filter($dummyViolations, fn($v) => $v['status'] === 'unpaid'));
    $totalRevenue = array_sum(array_map(fn($p) => $p['payment_status'] === 'paid' ? $p['amount'] : 0, $dummyPayments));
    
    return [
        'totalSlots' => $totalSlots,
        'occupiedSlots' => $occupiedSlots,
        'availableSlots' => $availableSlots,
        'activeBookings' => $activeBookings,
        'totalUsers' => $totalUsers,
        'unpaidViolations' => $unpaidViolations,
        'totalRevenue' => $totalRevenue,
        'todayRevenue' => 160.00 // Demo value
    ];
}
?>
