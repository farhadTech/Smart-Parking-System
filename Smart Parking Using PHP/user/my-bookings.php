<?php
/**
 * My Bookings
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireLogin();

if (isAdmin()) {
    header('Location: ../admin/dashboard.php');
    exit();
}

$userId = getCurrentUserId();

// Handle cancellation
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cancel_booking'])) {
    $bookingId = $_POST['booking_id'];
    
    // Verify ownership and status
    $checkStmt = $pdo->prepare("SELECT slot_id FROM bookings WHERE id = ? AND user_id = ? AND status = 'active'");
    $checkStmt->execute([$bookingId, $userId]);
    $booking = $checkStmt->fetch();
    
    if ($booking) {
        $pdo->beginTransaction();
        try {
            // Update booking status
            $updateBooking = $pdo->prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?");
            $updateBooking->execute([$bookingId]);
            
            // Free the slot
            $updateSlot = $pdo->prepare("UPDATE parking_slots SET status = 'available' WHERE id = ?");
            $updateSlot->execute([$booking['slot_id']]);
            
            $pdo->commit();
            setFlashMessage('success', 'Booking cancelled successfully');
        } catch (Exception $e) {
            $pdo->rollBack();
            setFlashMessage('danger', 'Failed to cancel booking');
        }
    }
    header('Location: my-bookings.php');
    exit();
}

// Get user's bookings
$bookingsQuery = $pdo->prepare("
    SELECT b.*, ps.slot_number, ps.type as slot_type, 
           p.payment_status, p.id as payment_id
    FROM bookings b
    JOIN parking_slots ps ON b.slot_id = ps.id
    LEFT JOIN payments p ON p.booking_id = b.id
    WHERE b.user_id = ?
    ORDER BY b.booking_time DESC
");
$bookingsQuery->execute([$userId]);
$bookings = $bookingsQuery->fetchAll();

$pageTitle = 'My Bookings';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-calendar-check"></i> My Bookings</h2>

<?php if (empty($bookings)): ?>
    <div class="alert alert-info">
        <i class="bi bi-info-circle"></i> You don't have any bookings yet. 
        <a href="dashboard.php">Book a slot now!</a>
    </div>
<?php else: ?>
    <div class="table-responsive">
        <table class="table table-striped table-hover bg-white">
            <thead class="table-dark">
                <tr>
                    <th>Booking ID</th>
                    <th>Slot</th>
                    <th>Vehicle</th>
                    <th>Start Time</th>
                    <th>End Time</th>
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
                            <span class="badge bg-primary"><?php echo htmlspecialchars($booking['slot_number']); ?></span>
                            <small class="text-muted">(<?php echo ucfirst($booking['slot_type']); ?>)</small>
                        </td>
                        <td><?php echo htmlspecialchars($booking['vehicle_number']); ?></td>
                        <td><?php echo date('M d, Y H:i', strtotime($booking['start_time'])); ?></td>
                        <td><?php echo date('M d, Y H:i', strtotime($booking['end_time'])); ?></td>
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
                                <div class="btn-group btn-group-sm">
                                    <?php if ($booking['payment_status'] !== 'paid'): ?>
                                        <a href="payment.php?booking_id=<?php echo $booking['id']; ?>" 
                                           class="btn btn-success" title="Pay Now">
                                            <i class="bi bi-wallet2"></i>
                                        </a>
                                    <?php endif; ?>
                                    <form method="POST" action="" class="d-inline" 
                                          onsubmit="return confirm('Are you sure you want to cancel this booking?');">
                                        <input type="hidden" name="booking_id" value="<?php echo $booking['id']; ?>">
                                        <button type="submit" name="cancel_booking" class="btn btn-danger" title="Cancel">
                                            <i class="bi bi-x-circle"></i>
                                        </button>
                                    </form>
                                </div>
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
