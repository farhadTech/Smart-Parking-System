<?php
/**
 * Admin Dashboard
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../includes/dummy_data.php';

requireAdmin();

// Check if we're in dummy mode
if (isDummyMode()) {
    // Use dummy data
    $stats = getDummyStats();
    $totalSlots = $stats['totalSlots'];
    $occupiedSlots = $stats['occupiedSlots'];
    $availableSlots = $stats['availableSlots'];
    $activeBookings = $stats['activeBookings'];
    $totalUsers = $stats['totalUsers'];
    $unpaidViolations = $stats['unpaidViolations'];
    $todayRevenue = $stats['todayRevenue'];
    $totalRevenue = $stats['totalRevenue'];
    
    // Recent bookings from dummy data
    $recentBookings = array_slice($GLOBALS['dummyBookings'], 0, 5);
} else {
    // Use database
    require_once '../config/db.php';
    
    // Get statistics
    $totalSlots = $pdo->query("SELECT COUNT(*) FROM parking_slots")->fetchColumn();
    $occupiedSlots = $pdo->query("SELECT COUNT(*) FROM parking_slots WHERE status = 'occupied'")->fetchColumn();
    $availableSlots = $pdo->query("SELECT COUNT(*) FROM parking_slots WHERE status = 'available'")->fetchColumn();
    $activeBookings = $pdo->query("SELECT COUNT(*) FROM bookings WHERE status = 'active'")->fetchColumn();
    $totalUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'driver'")->fetchColumn();
    $unpaidViolations = $pdo->query("SELECT COUNT(*) FROM violations WHERE status = 'unpaid'")->fetchColumn();
    $todayRevenue = $pdo->query("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'paid' AND DATE(booking_id) = CURDATE()")->fetchColumn();
    $totalRevenue = $pdo->query("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'paid'")->fetchColumn();

    // Recent bookings
    $recentBookings = $pdo->query("
        SELECT b.*, u.name as user_name, ps.slot_number
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN parking_slots ps ON b.slot_id = ps.id
        ORDER BY b.booking_time DESC
        LIMIT 5
    ")->fetchAll();
}

$pageTitle = 'Admin Dashboard';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-speedometer2"></i> Admin Dashboard</h2>

<?php if (isDummyMode()): ?>
<div class="alert alert-warning mb-4">
    <i class="bi bi-lightning-fill"></i> <strong>Demo Mode:</strong> Viewing sample data. All changes are simulated.
</div>
<?php endif; ?>

<!-- Stats Cards -->
<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card stat-card bg-primary text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $totalSlots; ?></p>
                    <p class="stat-label text-white-50">Total Slots</p>
                </div>
                <i class="bi bi-grid-3x3 stat-icon"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card bg-success text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $availableSlots; ?></p>
                    <p class="stat-label text-white-50">Available</p>
                </div>
                <i class="bi bi-check-circle stat-icon"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card bg-danger text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $occupiedSlots; ?></p>
                    <p class="stat-label text-white-50">Occupied</p>
                </div>
                <i class="bi bi-car-front stat-icon"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card bg-warning text-dark">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $activeBookings; ?></p>
                    <p class="stat-label">Active Bookings</p>
                </div>
                <i class="bi bi-calendar-check stat-icon"></i>
            </div>
        </div>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card stat-card">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number text-primary"><?php echo $totalUsers; ?></p>
                    <p class="stat-label">Registered Users</p>
                </div>
                <i class="bi bi-people stat-icon text-primary"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number text-danger"><?php echo $unpaidViolations; ?></p>
                    <p class="stat-label">Unpaid Fines</p>
                </div>
                <i class="bi bi-exclamation-triangle stat-icon text-danger"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number text-success">৳<?php echo number_format($todayRevenue, 0); ?></p>
                    <p class="stat-label">Today's Revenue</p>
                </div>
                <i class="bi bi-cash stat-icon text-success"></i>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number text-success">৳<?php echo number_format($totalRevenue, 0); ?></p>
                    <p class="stat-label">Total Revenue</p>
                </div>
                <i class="bi bi-wallet2 stat-icon text-success"></i>
            </div>
        </div>
    </div>
</div>

<!-- Quick Actions -->
<div class="row g-4 mb-4">
    <div class="col-md-6">
        <div class="card shadow h-100">
            <div class="card-header">
                <h5 class="mb-0"><i class="bi bi-lightning"></i> Quick Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <a href="slots.php" class="btn btn-primary">
                        <i class="bi bi-grid-3x3-gap"></i> Manage Slots (Hardware Simulation)
                    </a>
                    <a href="bookings.php" class="btn btn-outline-primary">
                        <i class="bi bi-calendar-check"></i> View All Bookings
                    </a>
                    <a href="violations.php" class="btn btn-outline-danger">
                        <i class="bi bi-exclamation-triangle"></i> Issue Violation
                    </a>
                    <a href="payments.php" class="btn btn-outline-success">
                        <i class="bi bi-credit-card"></i> View Payments
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card shadow h-100">
            <div class="card-header">
                <h5 class="mb-0"><i class="bi bi-clock-history"></i> Recent Bookings</h5>
            </div>
            <div class="card-body p-0">
                <?php if (empty($recentBookings)): ?>
                    <p class="text-muted p-3 mb-0">No bookings yet</p>
                <?php else: ?>
                    <ul class="list-group list-group-flush">
                        <?php foreach ($recentBookings as $booking): ?>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong><?php echo htmlspecialchars($booking['user_name']); ?></strong>
                                    <br>
                                    <small class="text-muted">
                                        Slot <?php echo $booking['slot_number']; ?> - 
                                        <?php echo $booking['vehicle_number']; ?>
                                    </small>
                                </div>
                                <span class="badge bg-<?php echo $booking['status'] === 'active' ? 'primary' : ($booking['status'] === 'completed' ? 'success' : 'secondary'); ?>">
                                    <?php echo ucfirst($booking['status']); ?>
                                </span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php require_once '../includes/footer.php'; ?>
