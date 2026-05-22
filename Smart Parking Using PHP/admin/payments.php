<?php
/**
 * Payment Management
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireAdmin();

// Handle marking cash payment as received
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['mark_paid'])) {
    $paymentId = $_POST['payment_id'];
    
    $stmt = $pdo->prepare("UPDATE payments SET payment_status = 'paid', payment_method = 'cash' WHERE id = ?");
    $stmt->execute([$paymentId]);
    
    setFlashMessage('success', 'Payment marked as received');
    header('Location: payments.php');
    exit();
}

// Get filter
$methodFilter = $_GET['method'] ?? 'all';
$statusFilter = $_GET['status'] ?? 'all';

// Build query
$sql = "
    SELECT p.*, b.vehicle_number, u.name as user_name, u.email as user_email, ps.slot_number
    FROM payments p
    JOIN bookings b ON p.booking_id = b.id
    JOIN users u ON b.user_id = u.id
    JOIN parking_slots ps ON b.slot_id = ps.id
    WHERE 1=1
";

$params = [];

if ($methodFilter !== 'all') {
    $sql .= " AND p.payment_method = :method";
    $params['method'] = $methodFilter;
}

if ($statusFilter !== 'all') {
    $sql .= " AND p.payment_status = :status";
    $params['status'] = $statusFilter;
}

$sql .= " ORDER BY p.id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$payments = $stmt->fetchAll();

// Calculate totals
$totalRevenue = $pdo->query("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'paid'")->fetchColumn();
$pendingAmount = $pdo->query("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'pending'")->fetchColumn();

// Revenue by method
$revenueByMethod = $pdo->query("
    SELECT payment_method, SUM(amount) as total 
    FROM payments 
    WHERE payment_status = 'paid' 
    GROUP BY payment_method
")->fetchAll(PDO::FETCH_KEY_PAIR);

$pageTitle = 'Payment Management';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-credit-card"></i> Payment Management</h2>

<!-- Stats -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card bg-success text-white">
            <div class="card-body">
                <h5>Total Revenue</h5>
                <p class="display-6 mb-0">৳<?php echo number_format($totalRevenue, 0); ?></p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card bg-warning text-dark">
            <div class="card-body">
                <h5>Pending Payments</h5>
                <p class="display-6 mb-0">৳<?php echo number_format($pendingAmount, 0); ?></p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <div class="card-body">
                <h6>Revenue by Method</h6>
                <ul class="list-unstyled mb-0 small">
                    <?php 
                    $methods = ['bkash' => 'bKash', 'nagad' => 'Nagad', 'rocket' => 'Rocket', 'cash' => 'Cash', 'card' => 'Card'];
                    foreach ($methods as $key => $label): 
                        $amount = $revenueByMethod[$key] ?? 0;
                    ?>
                        <li class="d-flex justify-content-between">
                            <span><?php echo $label; ?>:</span>
                            <strong>৳<?php echo number_format($amount, 0); ?></strong>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- Filters -->
<div class="mb-4 d-flex gap-3 flex-wrap">
    <div>
        <label class="form-label small mb-1">Payment Method:</label>
        <div class="btn-group">
            <a href="?method=all&status=<?php echo $statusFilter; ?>" class="btn btn-sm btn-<?php echo $methodFilter === 'all' ? 'primary' : 'outline-primary'; ?>">All</a>
            <a href="?method=bkash&status=<?php echo $statusFilter; ?>" class="btn btn-sm btn-<?php echo $methodFilter === 'bkash' ? 'danger' : 'outline-danger'; ?>">bKash</a>
            <a href="?method=nagad&status=<?php echo $statusFilter; ?>" class="btn btn-sm btn-<?php echo $methodFilter === 'nagad' ? 'warning' : 'outline-warning'; ?>">Nagad</a>
            <a href="?method=rocket&status=<?php echo $statusFilter; ?>" class="btn btn-sm btn-<?php echo $methodFilter === 'rocket' ? 'info' : 'outline-info'; ?>">Rocket</a>
            <a href="?method=cash&status=<?php echo $statusFilter; ?>" class="btn btn-sm btn-<?php echo $methodFilter === 'cash' ? 'success' : 'outline-success'; ?>">Cash</a>
        </div>
    </div>
    <div>
        <label class="form-label small mb-1">Status:</label>
        <div class="btn-group">
            <a href="?method=<?php echo $methodFilter; ?>&status=all" class="btn btn-sm btn-<?php echo $statusFilter === 'all' ? 'primary' : 'outline-primary'; ?>">All</a>
            <a href="?method=<?php echo $methodFilter; ?>&status=paid" class="btn btn-sm btn-<?php echo $statusFilter === 'paid' ? 'success' : 'outline-success'; ?>">Paid</a>
            <a href="?method=<?php echo $methodFilter; ?>&status=pending" class="btn btn-sm btn-<?php echo $statusFilter === 'pending' ? 'warning' : 'outline-warning'; ?>">Pending</a>
        </div>
    </div>
</div>

<!-- Payments Table -->
<?php if (empty($payments)): ?>
    <div class="alert alert-info">No payments found.</div>
<?php else: ?>
    <div class="table-responsive">
        <table class="table table-striped table-hover bg-white">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Slot</th>
                    <th>Vehicle</th>
                    <th>Method</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($payments as $payment): ?>
                    <tr>
                        <td>#<?php echo $payment['id']; ?></td>
                        <td>
                            <?php echo htmlspecialchars($payment['user_name']); ?>
                            <br><small class="text-muted"><?php echo $payment['user_email']; ?></small>
                        </td>
                        <td><span class="badge bg-primary"><?php echo $payment['slot_number']; ?></span></td>
                        <td><?php echo htmlspecialchars($payment['vehicle_number']); ?></td>
                        <td>
                            <?php if ($payment['payment_method']): ?>
                                <span class="badge bg-<?php 
                                    echo $payment['payment_method'] === 'bkash' ? 'danger' : 
                                        ($payment['payment_method'] === 'nagad' ? 'warning' : 
                                        ($payment['payment_method'] === 'rocket' ? 'info' : 
                                        ($payment['payment_method'] === 'cash' ? 'success' : 'secondary'))); 
                                ?>">
                                    <?php echo ucfirst($payment['payment_method']); ?>
                                </span>
                            <?php else: ?>
                                <span class="text-muted">—</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php echo $payment['transaction_id'] ? htmlspecialchars($payment['transaction_id']) : '<span class="text-muted">—</span>'; ?>
                        </td>
                        <td class="fw-bold">৳<?php echo number_format($payment['amount'], 0); ?></td>
                        <td>
                            <?php if ($payment['payment_status'] === 'paid'): ?>
                                <span class="badge bg-success">Paid</span>
                            <?php else: ?>
                                <span class="badge bg-warning text-dark">Pending</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($payment['payment_status'] === 'pending'): ?>
                                <form method="POST" class="d-inline">
                                    <input type="hidden" name="payment_id" value="<?php echo $payment['id']; ?>">
                                    <button type="submit" name="mark_paid" class="btn btn-sm btn-success" 
                                            title="Mark as Cash Received">
                                        <i class="bi bi-cash"></i> Cash Received
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
