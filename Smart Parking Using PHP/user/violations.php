<?php
/**
 * User Violations/Fines
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

// Get user's violations
$violationsQuery = $pdo->prepare("
    SELECT v.*, b.vehicle_number, ps.slot_number
    FROM violations v
    JOIN bookings b ON v.booking_id = b.id
    JOIN parking_slots ps ON b.slot_id = ps.id
    WHERE b.user_id = ?
    ORDER BY v.status ASC, v.id DESC
");
$violationsQuery->execute([$userId]);
$violations = $violationsQuery->fetchAll();

// Calculate totals
$totalUnpaid = 0;
$unpaidCount = 0;
foreach ($violations as $v) {
    if ($v['status'] === 'unpaid') {
        $totalUnpaid += $v['fine_amount'];
        $unpaidCount++;
    }
}

$pageTitle = 'My Fines';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-exclamation-triangle"></i> My Fines & Violations</h2>

<?php if ($totalUnpaid > 0): ?>
    <div class="alert alert-danger">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <i class="bi bi-exclamation-circle"></i> 
                <strong>You have <?php echo $unpaidCount; ?> unpaid fine(s)!</strong> Total: ৳<?php echo number_format($totalUnpaid, 0); ?>
            </div>
            <a href="pay-fine.php?pay_all=1" class="btn btn-danger btn-sm">
                <i class="bi bi-wallet2"></i> Pay All Fines
            </a>
        </div>
    </div>
<?php endif; ?>

<?php if (empty($violations)): ?>
    <div class="alert alert-success">
        <i class="bi bi-check-circle"></i> Great! You have no violations or fines.
    </div>
<?php else: ?>
    <div class="table-responsive">
        <table class="table table-striped table-hover bg-white">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Slot</th>
                    <th>Vehicle</th>
                    <th>Violation Type</th>
                    <th>Fine Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($violations as $violation): ?>
                    <tr>
                        <td>#<?php echo $violation['id']; ?></td>
                        <td><span class="badge bg-primary"><?php echo htmlspecialchars($violation['slot_number']); ?></span></td>
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
                            <?php if ($violation['status'] === 'unpaid'): ?>
                                <a href="pay-fine.php?violation_id=<?php echo $violation['id']; ?>" 
                                   class="btn btn-sm btn-danger">
                                    <i class="bi bi-wallet2"></i> Pay
                                </a>
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
