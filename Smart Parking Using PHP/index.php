<?php
/**
 * Landing Page
 * Smart Parking Management System
 */
require_once 'includes/auth.php';

// Redirect logged in users to their dashboard
if (isLoggedIn()) {
    if (isAdmin()) {
        header('Location: admin/dashboard.php');
    } else {
        header('Location: user/dashboard.php');
    }
    exit();
}

$pageTitle = 'Welcome';
require_once 'includes/header.php';
?>

<div class="hero-section">
    <div class="container">
        <h1><i class="bi bi-car-front-fill"></i> Smart Parking System</h1>
        <p class="lead mb-4">Find, book, and manage parking slots with ease</p>
        <div class="d-flex gap-3 justify-content-center">
            <a href="register.php" class="btn btn-light btn-lg">
                <i class="bi bi-person-plus"></i> Get Started
            </a>
            <a href="login.php" class="btn btn-outline-light btn-lg">
                <i class="bi bi-box-arrow-in-right"></i> Login
            </a>
        </div>
    </div>
</div>

<div class="container py-5">
    <h2 class="text-center mb-5">Features</h2>
    <div class="row g-4">
        <div class="col-md-4">
            <div class="feature-card">
                <i class="bi bi-geo-alt"></i>
                <h4>Real-Time Availability</h4>
                <p class="text-muted">See available parking slots in real-time with our visual slot grid</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="feature-card">
                <i class="bi bi-calendar-check"></i>
                <h4>Easy Booking</h4>
                <p class="text-muted">Book your parking slot instantly with just a few clicks</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="feature-card">
                <i class="bi bi-wallet2"></i>
                <h4>Multiple Payments</h4>
                <p class="text-muted">Pay via bKash, Nagad, Rocket, or Cash - your choice</p>
            </div>
        </div>
    </div>
</div>

<div class="bg-light py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <h3>For Vehicle Owners</h3>
                <ul class="list-unstyled">
                    <li class="mb-2"><i class="bi bi-check-circle text-success"></i> View all parking slots at a glance</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-success"></i> Book and manage your parking</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-success"></i> Track payments and violations</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h3>For Administrators</h3>
                <ul class="list-unstyled">
                    <li class="mb-2"><i class="bi bi-check-circle text-primary"></i> Manage all parking slots</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-primary"></i> Simulate hardware sensors</li>
                    <li class="mb-2"><i class="bi bi-check-circle text-primary"></i> Issue violations and track payments</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
