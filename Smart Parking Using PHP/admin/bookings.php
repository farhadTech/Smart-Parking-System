<?php
/**
 * Booking Management
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireAdmin();

// Handle booking actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bookingId = $_POST['booking_id'];
    
    if (isset($_POST['complete_booking'])) {
        $pdo->beginTransaction();
        try {
            // Get slot ID
            $stmt = $pdo->prepare("SELECT slot_id FROM bookings WHERE id = ?");
            $stmt->execute([$bookingId]);
            $booking = $stmt->fetch();
            
            // Update booking status
            $update = $pdo->prepare("UPDATE bookings SET status = 'completed' WHERE id = ?");
            $update->execute([$bookingId]);
            
            // Free the slot
            $updateSlot = $pdo->prepare("UPDATE parking_slots SET status = 'available' WHERE id = ?");
            $updateSlot->execute([$booking['slot_id']]);
            
            $pdo->commit();
            setFlashMessage('success', 'Booking marked as completed');
        } catch (Exception $e) {
            $pdo->rollBack();
            setFlashMessage('danger', 'Failed to complete booking');
        }
    }
    
    if (isset($_POST['cancel_booking'])) {
        $pdo->beginTransaction();
        try {
            // Get slot ID
            $stmt = $pdo->prepare("SELECT slot_id FROM bookings WHERE id = ?");
            $stmt->execute([$bookingId]);
            $booking = $stmt->fetch();
            
            // Update booking status
            $update = $pdo->prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?");
            $update->execute([$bookingId]);
            
            // Free the slot
            $updateSlot = $pdo->prepare("UPDATE parking_slots SET status = 'available' WHERE id = ?");
            $updateSlot->execute([$booking['slot_id']]);
            
            $pdo->commit();
            setFlashMessage('warning', 'Booking cancelled');
        } catch (Exception $e) {
            $pdo->rollBack();
            setFlashMessage('danger', 'Failed to cancel booking');
        }
    }
    
    header('Location: bookings.php');
    exit();
}

// Get filter
$statusFilter = $_GET['status'] ?? 'all';

// Build query
$sql = "
    SELECT b.*, u.name as user_name, u.email as user_email, ps.slot_number,
           p.payment_status
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN parking_slots ps ON b.slot_id = ps.id
    LEFT JOIN payments p ON p.booking_id = b.id
";

if ($statusFilter !== 'all') {
    $sql .= " WHERE b.status = :status";
}
$sql .= " ORDER BY b.booking_time DESC";

$stmt = $pdo->prepare($sql);
if ($statusFilter !== 'all') {
    $stmt->execute(['status' => $statusFilter]);
} else {
    $stmt->execute();
}
$bookings = $stmt->fetchAll();

$pageTitle = 'Booking Management';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-calendar-check"></i> Booking Management</h2>

<!-- Filter -->
<div class="mb-4">
    <div class="btn-group">
        <a href="?status=all" class="btn btn-<?php echo $statusFilter === 'all' ? 'primary' : 'outline-primary'; ?>">
            All
        </a>
        <a href="?status=active" class="btn btn-<?php echo $statusFilter === 'active' ? 'primary' : 'outline-primary'; ?>">
            Active
        </a>
        <a href="?status=completed" class="btn btn-<?php echo $statusFilter === 'completed' ? 'success' : 'outline-success'; ?>">
            Completed
        </a>
        <a href="?status=cancelled" class="btn btn-<?php echo $statusFilter === 'cancelled' ? 'secondary' : 'outline-secondary'; ?>">
            Cancelled
        </a>
    </div>
</div>

<?php if (empty($bookings)): ?>
    <div class="alert alert-info">No bookings found.</div>
<?php else: ?>
    <div class="table-responsive">
        <table class="table table-striped table-hover bg-white">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Slot</th>
                    <th>Vehicle</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Cost</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($bookings as $booking): ?>
                    <tr>
                        <td>#<?php echo $booking['id']; ?></td>
                        <td>
                            <?php echo htmlspecialchars($booking['user_name']); ?>
                            <br><small class="text-muted"><?php echo $booking['user_email']; ?></small>
                        </td>
                        <td><span class="badge bg-primary"><?php echo $booking['slot_number']; ?></span></td>
                        <td><?php echo htmlspecialchars($booking['vehicle_number']); ?></td>
                        <td><?php echo date('M d, H:i', strtotime($booking['start_time'])); ?></td>
                        <td><?php echo date('M d, H:i', strtotime($booking['end_time'])); ?></td>
                        <td class="fw-bold">৳<?php echo number_format($booking['total_cost'], 0); ?></td>
                        <td>
                            <?php if ($booking['payment_status'] === 'paid'): ?>
                                <span class="badge bg-success">Paid</span>
                            <?php else: ?>
                                <span class="badge bg-warning text-dark">Pending</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($booking['status'] === 'active'): ?>
                                <span class="badge bg-primary">Active</span>
                            <?php elseif ($booking['status'] === 'completed'): ?>
                                <span class="badge bg-success">Completed</span>
                            <?php else: ?>
                                <span class="badge bg-secondary">Cancelled</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($booking['status'] === 'active'): ?>
                                <form method="POST" class="d-inline">
                                    <input type="hidden" name="booking_id" value="<?php echo $booking['id']; ?>">
                                    <button type="submit" name="complete_booking" class="btn btn-sm btn-success" title="Complete">
                                        <i class="bi bi-check-lg"></i>
                                    </button>
                                    <button type="submit" name="cancel_booking" class="btn btn-sm btn-danger" title="Cancel">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </form>
                            <?php else: ?>
                                <span class="text-muted">—</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>

<?php require_once '../includes/footer.php'; ?>
