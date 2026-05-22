<?php
/**
 * Authentication Helper Functions
 * Smart Parking Management System
 */

session_start();

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

/**
 * Check if logged in user is admin
 */
function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

/**
 * Require login - redirect to login page if not logged in
 */
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: /Smart%20Parking%20System/login.php');
        exit();
    }
}

/**
 * Require admin role - redirect if not admin
 */
function requireAdmin() {
    requireLogin();
    if (!isAdmin()) {
        header('Location: /Smart%20Parking%20System/user/dashboard.php');
        exit();
    }
}

/**
 * Get current user ID
 */
function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

/**
 * Get current user name
 */
function getCurrentUserName() {
    return $_SESSION['user_name'] ?? 'Guest';
}

/**
 * Get current user role
 */
function getCurrentUserRole() {
    return $_SESSION['role'] ?? null;
}

/**
 * Set flash message
 */
function setFlashMessage($type, $message) {
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message
    ];
}

/**
 * Get and clear flash message
 */
function getFlashMessage() {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
?>
