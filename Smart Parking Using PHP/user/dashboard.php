<?php
/**
 * User Dashboard
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../includes/dummy_data.php';

requireLogin();

// Redirect admin to admin dashboard
if (isAdmin()) {
    header('Location: ../admin/dashboard.php');
    exit();
}

$userId = getCurrentUserId();

// Check if we're in dummy mode
if (isDummyMode()) {
    // Use dummy data
    $slots = $GLOBALS['dummySlots'];
    $activeBookings = count(array_filter(getDummyUserBookings($userId), fn($b) => $b['status'] === 'active'));
    $pendingPayments = count(array_filter(getDummyUserBookings($userId), fn($b) => $b['payment_status'] === 'pending'));
    $userViolations = getDummyUserViolations($userId);
    $unpaidViolations = count(array_filter($userViolations, fn($v) => $v['status'] === 'unpaid'));
} else {
    // Use database
    require_once '../config/db.php';
    
    // Get user statistics
    $activeBookingsQuery = $pdo->prepare("SELECT COUNT(*) FROM bookings WHERE user_id = ? AND status = 'active'");
    $activeBookingsQuery->execute([$userId]);
    $activeBookings = $activeBookingsQuery->fetchColumn();

    $pendingPaymentsQuery = $pdo->prepare("
        SELECT COUNT(*) FROM payments p 
        JOIN bookings b ON p.booking_id = b.id 
        WHERE b.user_id = ? AND p.payment_status = 'pending'
    ");
    $pendingPaymentsQuery->execute([$userId]);
    $pendingPayments = $pendingPaymentsQuery->fetchColumn();

    $unpaidViolationsQuery = $pdo->prepare("
        SELECT COUNT(*) FROM violations v 
        JOIN bookings b ON v.booking_id = b.id 
        WHERE b.user_id = ? AND v.status = 'unpaid'
    ");
    $unpaidViolationsQuery->execute([$userId]);
    $unpaidViolations = $unpaidViolationsQuery->fetchColumn();

    // Get all parking slots
    $slotsQuery = $pdo->query("SELECT * FROM parking_slots ORDER BY slot_number");
    $slots = $slotsQuery->fetchAll();
}

$pageTitle = 'Dashboard';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-speedometer2"></i> Driver Dashboard</h2>

<?php if (isDummyMode()): ?>
<div class="alert alert-warning mb-4">
    <i class="bi bi-lightning-fill"></i> <strong>Demo Mode:</strong> Viewing sample data. Booking actions are simulated.
</div>
<?php endif; ?>

<!-- Stats Cards -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card stat-card bg-primary text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $activeBookings; ?></p>
                    <p class="stat-label text-white-50">Active Bookings</p>
                </div>
                <i class="bi bi-calendar-check stat-icon"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card stat-card bg-warning text-dark">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $pendingPayments; ?></p>
                    <p class="stat-label">Pending Payments</p>
                </div>
                <i class="bi bi-wallet2 stat-icon"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card stat-card bg-danger text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <p class="stat-number"><?php echo $unpaidViolations; ?></p>
                    <p class="stat-label text-white-50">Unpaid Fines</p>
                </div>
                <i class="bi bi-exclamation-triangle stat-icon"></i>
            </div>
        </div>
    </div>
</div>

<!-- Legend -->
<div class="legend">
    <div class="legend-item">
        <div class="legend-color available"></div>
        <span>Available</span>
    </div>
    <div class="legend-item">
        <div class="legend-color occupied"></div>
        <span>Occupied</span>
    </div>
    <div class="legend-item">
        <div class="legend-color reserved"></div>
        <span>Reserved / Emergency</span>
    </div>
    <div class="legend-item">
        <div class="legend-color maintenance"></div>
        <span>Maintenance</span>
    </div>
</div>

<!-- Parking Slots Grid -->
<h4 class="mb-3"><i class="bi bi-grid-3x3-gap"></i> Available Parking Slots</h4>
<p class="text-muted">Click on an available (green) slot to book it</p>

<div class="slot-grid">
    <?php foreach ($slots as $slot): ?>
        <?php
        $statusClass = $slot['status'];
        if ($slot['is_emergency'] && $slot['status'] === 'available') {
            $statusClass = 'emergency';
        }
        $isClickable = ($slot['status'] === 'available' && !$slot['is_emergency']);
        ?>
        
        <?php if ($isClickable): ?>
            <a href="book.php?slot_id=<?php echo $slot['id']; ?>" class="slot-card <?php echo $statusClass; ?>">
        <?php else: ?>
            <div class="slot-card <?php echo $statusClass; ?>">
        <?php endif; ?>
        
            <?php if ($slot['is_emergency']): ?>
                <span class="emergency-badge">EMERGENCY</span>
            <?php endif; ?>
            
            <span class="slot-number"><?php echo htmlspecialchars($slot['slot_number']); ?></span>
            <span class="slot-type"><?php echo ucfirst($slot['type']); ?></span>
            <span class="slot-price">৳<?php echo number_format($slot['price_per_hour'], 0); ?>/hr</span>
        
        <?php if ($isClickable): ?>
            </a>
        <?php else: ?>
            </div>
        <?php endif; ?>
    <?php endforeach; ?>
</div>

<?php require_once '../includes/footer.php'; ?>
