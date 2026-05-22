-- Smart Parking Management System Database Schema
-- Run this script in phpMyAdmin after creating database 'smart_parking'

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'driver') DEFAULT 'driver',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parking_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_number VARCHAR(10) UNIQUE NOT NULL,
    type ENUM('car', 'bike', 'bicycle') DEFAULT 'car',
    status ENUM('available', 'occupied', 'reserved', 'maintenance') DEFAULT 'available',
    is_emergency TINYINT(1) DEFAULT 0, 
    price_per_hour DECIMAL(10,2) DEFAULT 20.00
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    slot_id INT,
    vehicle_number VARCHAR(20) NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_time DATETIME,
    end_time DATETIME,
    total_cost DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (slot_id) REFERENCES parking_slots(id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    payment_method ENUM('cash', 'bkash', 'nagad', 'rocket', 'card'),
    transaction_id VARCHAR(50),
    amount DECIMAL(10,2),
    payment_status ENUM('pending', 'paid') DEFAULT 'pending',
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE violations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    violation_type VARCHAR(255),
    fine_amount DECIMAL(10,2),
    status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
