<?php
/**
 * Logout
 * Smart Parking Management System
 */
session_start();

// Clear all session variables
$_SESSION = [];

// Destroy the session
session_destroy();

// Redirect to login
header('Location: login.php');
exit();
?>
