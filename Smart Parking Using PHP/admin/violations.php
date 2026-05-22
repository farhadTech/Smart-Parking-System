<?php
/**
 * Violation Management (Punishment System)
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireAdmin();

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add new violation
    if (isset($_POST['add_violation'])) {
        $bookingId = $_POST['booking_id'];
        $violationType = trim($_POST['violation_type']);
        $fineAmount = floatval($_POST['fine_amount']);
        
        if ($bookingId && $violationType && $fineAmount > 0) {
            $stmt = $pdo->prepare("INSERT INTO violations (booking_id, violation_type, fine_amount, status) VALUES (?, ?, ?, 'unpaid')");
            $stmt->execute([$bookingId, $violationType, $fineAmount]);
            setFlashMessage('success', 'Violation added successfully');
        } else {
            setFlashMessage('danger', 'Please fill all fields correctly');
        }
        header('Location: violations.php');
        exit();
    }
    
    // Mark fine as paid
    if (isset($_POST['mark_paid'])) {
        $violationId = $_POST['violation_id'];
        $stmt = $pdo->prepare("UPDATE violations SET status = 'paid' WHERE id = ?");
        $stmt->execute([$violationId]);
        setFlashMessage('success', 'Fine marked as paid');
        header('Location: violations.php');
        exit();
    }
    
    // Delete violation
    if (isset($_POST['delete_violation'])) {
        $violationId = $_POST['violation_id'];
        $stmt = $pdo->prepare("DELETE FROM violations WHERE id = ?");
        $stmt->execute([$violationId]);
        setFlashMessage('warning', 'Violation deleted');
        header('Location: violations.php');
        exit();
    }
}

// Get active bookings for dropdown
$activeBookings = $pdo->query("
    SELECT b.id, b.vehicle_number, u.name as user_name, ps.slot_number
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN parking_slots ps ON b.slot_id = ps.id
    WHERE b.status = 'active'
    ORDER BY b.booking_time DESC
")->fetchAll();

// Get all violations
$violations = $pdo->query("
    SELECT v.*, b.vehicle_number, u.name as user_name, u.email as user_email, ps.slot_number
    FROM violations v
    JOIN bookings b ON v.booking_id = b.id
    JOIN users u ON b.user_id = u.id
    JOIN parking_slots ps ON b.slot_id = ps.id
    ORDER BY v.id DESC
")->fetchAll();

// Calculate totals
$totalUnpaid = $pdo->query("SELECT COALESCE(SUM(fine_amount), 0) FROM violations WHERE status = 'unpaid'")->fetchColumn();
$totalPaid = $pdo->query("SELECT COALESCE(SUM(fine_amount), 0) FROM violations WHERE status = 'paid'")->fetchColumn();

$pageTitle = 'Violation Management';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-exclamation-triangle"></i> Violation Management (Punishment System)</h2>

<!-- Stats -->
<div class="row g-4 mb-4">
    <div class="col-md-6">
        <div class="card bg-danger text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5>Unpaid Fines</h5>
                    <p class="display-6 mb-0">৳<?php echo number_format($totalUnpaid, 0); ?></p>
                </div>
                <i class="bi bi-exclamation-circle" style="font-size: 3rem; opacity: 0.5;"></i>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card bg-success text-white">
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5>Collected Fines</h5>
                    <p class="display-6 mb-0">৳<?php echo number_format($totalPaid, 0); ?></p>
                </div>
                <i class="bi bi-check-circle" style="font-size: 3rem; opacity: 0.5;"></i>
            </div>
        </div>
    </div>
</div>

<!-- Add Violation Form -->
<div class="card shadow mb-4">
    <div class="card-header bg-danger text-white">
        <h5 class="mb-0"><i class="bi bi-plus-circle"></i> Issue New Violation</h5>
    </div>
    <div class="card-body">
        <?php if (empty($activeBookings)): ?>
            <div class="alert alert-info mb-0">No active bookings available for issuing violations.</div>
        <?php else: ?>
            <form method="POST" action="">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label for="booking_id" class="form-label">Select Booking</label>
                        <select class="form-select" id="booking_id" name="booking_id" required>
                            <option value="">-- Select a booking --</option>
                            <?php foreach ($activeBookings as $booking): ?>
                                <option value="<?php echo $booking['id']; ?>">
                                    #<?php echo $booking['id']; ?> - 
                                    <?php echo htmlspecialchars($booking['user_name']); ?> 
                                    (<?php echo $booking['slot_number']; ?> - <?php echo $booking['vehicle_number']; ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="violation_type" class="form-label">Violation Type</label>
                        <select class="form-select" id="violation_type" name="violation_type" required>
                            <option value="">-- Select type --</option>
                            <option value="Overtime Parking">Overtime Parking</option>
                            <option value="Wrong Parking Spot">Wrong Parking Spot</option>
                            <option value="No Payment">No Payment</option>
                            <option value="Emergency Lane Violation">Emergency Lane Violation</option>
                            <option value="Vehicle Damage">Vehicle Damage</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="fine_amount" class="form-label">Fine Amount (৳)</label>
                        <input type="number" class="form-control" id="fine_amount" name="fine_amount" 
                               min="10" step="10" value="100" required>
                    </div>
                    <div class="col-md-2 d-flex align-items-end">
                        <button type="submit" name="add_violation" class="btn btn-danger w-100">
                            <i class="bi bi-plus-circle"></i> Issue Violation
                        </button>
                    </div>
                </div>
            </form>
        <?php endif; ?>
    </div>
</div>

<!-- Violations List -->
<div class="card shadow">
    <div class="card-header">
        <h5 class="mb-0"><i class="bi bi-list"></i> All Violations</h5>
    </div>
    <div class="card-body p-0">
        <?php if (empty($violations)): ?>
            <p class="text-muted p-3 mb-0">No violations recorded yet.</p>
        <?php else: ?>
            <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Slot</th>
                            <th>Vehicle</th>
                            <th>Violation Type</th>
                            <th>Fine</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($violations as $violation): ?>
                            <tr>
                                <td>#<?php echo $violation['id']; ?></td>
                                <td>
                                    <?php echo htmlspecialchars($violation['user_name']); ?>
                                    <br><small class="text-muted"><?php echo $violation['user_email']; ?></small>
                                </td>
                                <td><span class="badge bg-primary"><?php echo $violation['slot_number']; ?></span></td>
                                <td><?php echo htmlspecialchars($violation['vehicle_number']); ?></td>
                                <td><?php echo htmlspecialchars($violation['violation_type']); ?></td>
                                <td class="fw-bold text-danger">৳<?php echo number_format($violation['fine_amount'], 0); ?></td>
                                <td>
                                    <?php if ($violation['status'] === 'paid'): ?>
                                        <span class="badge bg-success">Paid</span>
                                    <?php else: ?>
                                        <span class="badge bg-danger">Unpaid</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <form method="POST" class="d-inline">
                                        <input type="hidden" name="violation_id" value="<?php echo $violation['id']; ?>">
                                        <?php if ($violation['status'] === 'unpaid'): ?>
                                            <button type="submit" name="mark_paid" class="btn btn-sm btn-success" title="Mark as Paid">
                                                <i class="bi bi-check-lg"></i>
                                            </button>
                                        <?php endif; ?>
                                        <button type="submit" name="delete_violation" class="btn btn-sm btn-danger" 
                                                onclick="return confirm('Are you sure?');" title="Delete">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php require_once '../includes/footer.php'; ?>
