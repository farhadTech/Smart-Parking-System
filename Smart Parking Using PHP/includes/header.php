<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - ' : ''; ?>Smart Parking System</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="/Smart%20Parking%20System/assets/css/style.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="<?php
                if (isLoggedIn()) {
                    echo isAdmin() ? '/Smart%20Parking%20System/admin/dashboard.php' : '/Smart%20Parking%20System/user/dashboard.php';
                } else {
                    echo '/Smart%20Parking%20System/';
                }
            ?>">
                <i class="bi bi-car-front-fill me-2"></i>Smart Parking
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <?php if (isLoggedIn()): ?>
                        <?php if (isAdmin()): ?>
                            <!-- Admin Menu -->
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/dashboard.php">
                                    <i class="bi bi-speedometer2"></i> Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/slots.php">
                                    <i class="bi bi-grid-3x3"></i> Slots
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/bookings.php">
                                    <i class="bi bi-calendar-check"></i> Bookings
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/users.php">
                                    <i class="bi bi-people"></i> Users
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/violations.php">
                                    <i class="bi bi-exclamation-triangle"></i> Violations
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/admin/payments.php">
                                    <i class="bi bi-credit-card"></i> Payments
                                </a>
                            </li>
                        <?php else: ?>
                            <!-- Driver Menu -->
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/user/dashboard.php">
                                    <i class="bi bi-speedometer2"></i> Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/user/my-bookings.php">
                                    <i class="bi bi-calendar-check"></i> My Bookings
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Smart%20Parking%20System/user/violations.php">
                                    <i class="bi bi-exclamation-triangle"></i> My Fines
                                </a>
                            </li>
                        <?php endif; ?>
                    <?php endif; ?>
                </ul>
                <ul class="navbar-nav">
                    <?php if (isLoggedIn()): ?>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i class="bi bi-person-circle"></i> <?php echo htmlspecialchars(getCurrentUserName()); ?>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><span class="dropdown-item-text text-muted small"><?php echo ucfirst(getCurrentUserRole()); ?></span></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/Smart%20Parking%20System/logout.php"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
                            </ul>
                        </li>
                    <?php else: ?>
                        <li class="nav-item">
                            <a class="nav-link" href="/Smart%20Parking%20System/login.php">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Smart%20Parking%20System/register.php">Register</a>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <main class="container py-4">
        <?php 
        $flash = getFlashMessage();
        if ($flash): 
        ?>
        <div class="alert alert-<?php echo $flash['type']; ?> alert-dismissible fade show" role="alert">
            <?php echo htmlspecialchars($flash['message']); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php endif; ?>
