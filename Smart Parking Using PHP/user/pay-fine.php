<?php
/**
 * Pay Fine Page
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
$violationId = $_GET['violation_id'] ?? null;
$errors = [];

// Check if paying single violation or all
$payAll = isset($_GET['pay_all']) && $_GET['pay_all'] === '1';

if ($payAll) {
    // Get all unpaid violations for this user
    $query = $pdo->prepare("
        SELECT v.*, b.vehicle_number, ps.slot_number
        FROM violations v
        JOIN bookings b ON v.booking_id = b.id
        JOIN parking_slots ps ON b.slot_id = ps.id
        WHERE b.user_id = ? AND v.status = 'unpaid'
    ");
    $query->execute([$userId]);
    $violations = $query->fetchAll();
    
    if (empty($violations)) {
        setFlashMessage('info', 'You have no unpaid fines');
        header('Location: violations.php');
        exit();
    }
    
    $totalAmount = array_sum(array_column($violations, 'fine_amount'));
    $violationIds = array_column($violations, 'id');
} else {
    // Get single violation
    if (!$violationId) {
        setFlashMessage('danger', 'No violation selected');
        header('Location: violations.php');
        exit();
    }
    
    $query = $pdo->prepare("
        SELECT v.*, b.vehicle_number, ps.slot_number
        FROM violations v
        JOIN bookings b ON v.booking_id = b.id
        JOIN parking_slots ps ON b.slot_id = ps.id
        WHERE v.id = ? AND b.user_id = ? AND v.status = 'unpaid'
    ");
    $query->execute([$violationId, $userId]);
    $violation = $query->fetch();
    
    if (!$violation) {
        setFlashMessage('danger', 'Violation not found or already paid');
        header('Location: violations.php');
        exit();
    }
    
    $violations = [$violation];
    $totalAmount = $violation['fine_amount'];
    $violationIds = [$violationId];
}

// Handle payment submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paymentMethod = $_POST['payment_method'] ?? '';
    $transactionId = trim($_POST['transaction_id'] ?? '');
    $cardNumber = trim($_POST['card_number'] ?? '');
    $receiptId = trim($_POST['receipt_id'] ?? '');

    // Validation
    $validMethods = ['cash', 'bkash', 'nagad', 'rocket', 'card'];
    if (!in_array($paymentMethod, $validMethods)) {
        $errors[] = 'Please select a valid payment method';
    }

    // Mobile payment validation
    if (in_array($paymentMethod, ['bkash', 'nagad', 'rocket']) && empty($transactionId)) {
        $errors[] = 'Transaction ID is required for mobile payments';
    }

    // Card payment validation
    if ($paymentMethod === 'card') {
        if (empty($cardNumber)) {
            $errors[] = 'Card number is required';
        } elseif (!preg_match('/^[0-9]{16}$/', preg_replace('/\s+/', '', $cardNumber))) {
            $errors[] = 'Please enter a valid 16-digit card number';
        }
    }

    // Cash payment validation
    if ($paymentMethod === 'cash' && empty($receiptId)) {
        $errors[] = 'Receipt ID is required for cash payments';
    }

    if (empty($errors)) {
        // Mark all selected violations as paid
        $placeholders = implode(',', array_fill(0, count($violationIds), '?'));
        $updateStmt = $pdo->prepare("UPDATE violations SET status = 'paid' WHERE id IN ($placeholders)");
        $updateStmt->execute($violationIds);

        $count = count($violationIds);
        setFlashMessage('success', "Payment successful! {$count} fine(s) paid. Total: ৳" . number_format($totalAmount, 0));
        header('Location: violations.php');
        exit();
    }
}

$pageTitle = $payAll ? 'Pay All Fines' : 'Pay Fine';
require_once '../includes/header.php';
?>

<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
        <li class="breadcrumb-item"><a href="violations.php">My Fines</a></li>
        <li class="breadcrumb-item active">Pay Fine</li>
    </ol>
</nav>

<div class="row">
    <div class="col-lg-8">
        <div class="card shadow">
            <div class="card-header bg-danger text-white">
                <h5 class="mb-0"><i class="bi bi-wallet2"></i> Pay Fine</h5>
            </div>
            <div class="card-body">
                <?php if (!empty($errors)): ?>
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            <?php foreach ($errors as $error): ?>
                                <li><?php echo htmlspecialchars($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>

                <form method="POST" action="">
                    <h6 class="mb-3">Select Payment Method</h6>
                    
                    <div class="row g-3 mb-4">
                        <!-- bKash -->
                        <div class="col-6 col-md-4">
                            <input type="radio" class="btn-check" name="payment_method" id="bkash" value="bkash">
                            <label class="payment-method bkash w-100 h-100" for="bkash">
                                <svg class="payment-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#E2136E"/>
                                    <path d="M24 8C15.164 8 8 15.164 8 24s7.164 16 16 16 16-7.164 16-16S32.836 8 24 8zm0 28c-6.627 0-12-5.373-12-12S17.373 12 24 12s12 5.373 12 12-5.373 12-12 12z" fill="white"/>
                                    <path d="M24 16c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
                                    <circle cx="24" cy="24" r="2" fill="white"/>
                                </svg>
                                <div class="payment-text fw-bold">bKash</div>
                            </label>
                        </div>
                        <!-- Nagad -->
                        <div class="col-6 col-md-4">
                            <input type="radio" class="btn-check" name="payment_method" id="nagad" value="nagad">
                            <label class="payment-method nagad w-100 h-100" for="nagad">
                                <svg class="payment-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F6921E"/>
                                    <path d="M14 14h20v20H14z" fill="white"/>
                                    <path d="M18 18h12v12H18z" fill="#F6921E"/>
                                    <path d="M22 22h4v4h-4z" fill="white"/>
                                </svg>
                                <div class="payment-text fw-bold">Nagad</div>
                            </label>
                        </div>
                        <!-- Rocket -->
                        <div class="col-6 col-md-4">
                            <input type="radio" class="btn-check" name="payment_method" id="rocket" value="rocket">
                            <label class="payment-method rocket w-100 h-100" for="rocket">
                                <svg class="payment-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#8C3494"/>
                                    <path d="M24 10l-6 12h4v16l6-12h-4V10z" fill="white"/>
                                    <circle cx="24" cy="24" r="4" fill="#8C3494" stroke="white" stroke-width="2"/>
                                </svg>
                                <div class="payment-text fw-bold">Rocket</div>
                            </label>
                        </div>
                        <!-- Cash -->
                        <div class="col-6 col-md-4">
                            <input type="radio" class="btn-check" name="payment_method" id="cash" value="cash">
                            <label class="payment-method cash w-100 h-100" for="cash">
                                <svg class="payment-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#10b981"/>
                                    <rect x="8" y="14" width="32" height="20" rx="3" fill="white"/>
                                    <circle cx="24" cy="24" r="6" fill="#10b981"/>
                                    <text x="24" y="28" text-anchor="middle" fill="white" font-size="10" font-weight="bold">৳</text>
                                </svg>
                                <div class="payment-text fw-bold">Cash</div>
                            </label>
                        </div>
                        <!-- Card -->
                        <div class="col-6 col-md-4">
                            <input type="radio" class="btn-check" name="payment_method" id="card" value="card">
                            <label class="payment-method card w-100 h-100" for="card">
                                <svg class="payment-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#3b82f6"/>
                                    <rect x="8" y="12" width="32" height="24" rx="3" fill="white"/>
                                    <rect x="8" y="18" width="32" height="6" fill="#3b82f6"/>
                                    <rect x="12" y="28" width="12" height="3" rx="1" fill="#d1d5db"/>
                                    <rect x="28" y="28" width="8" height="3" rx="1" fill="#d1d5db"/>
                                </svg>
                                <div class="payment-text fw-bold">Card</div>
                            </label>
                        </div>
                    </div>

                    <!-- Transaction ID for Mobile Payments -->
                    <div class="mb-4" id="transaction-id-section" style="display: none;">
                        <label for="transaction_id" class="form-label">Transaction ID</label>
                        <input type="text" class="form-control" id="transaction_id" name="transaction_id" 
                               placeholder="Enter your transaction ID">
                        <div class="form-text">Enter the transaction ID from your mobile payment confirmation</div>
                    </div>

                    <!-- Card Number for Card Payments -->
                    <div class="mb-4" id="card-number-section" style="display: none;">
                        <label for="card_number" class="form-label">Card Number</label>
                        <input type="text" class="form-control" id="card_number" name="card_number" 
                               placeholder="1234 5678 9012 3456" maxlength="19">
                        <div class="form-text">Enter your 16-digit card number</div>
                    </div>

                    <!-- Receipt ID for Cash Payments -->
                    <div class="mb-4" id="receipt-id-section" style="display: none;">
                        <label for="receipt_id" class="form-label">Receipt ID</label>
                        <input type="text" class="form-control" id="receipt_id" name="receipt_id" 
                               placeholder="Enter receipt ID from counter">
                        <div class="form-text">Enter the receipt ID given by the parking counter staff</div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-danger btn-lg">
                            <i class="bi bi-check-circle"></i> Pay ৳<?php echo number_format($totalAmount, 0); ?>
                        </button>
                        <a href="violations.php" class="btn btn-outline-secondary btn-lg">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card shadow">
            <div class="card-header bg-danger text-white">
                <h5 class="mb-0">Fine Summary</h5>
            </div>
            <div class="card-body">
                <?php if ($payAll): ?>
                    <p class="text-muted mb-3">Paying <?php echo count($violations); ?> violation(s)</p>
                <?php endif; ?>
                
                <table class="table table-borderless mb-0">
                    <?php foreach ($violations as $v): ?>
                        <tr>
                            <td>
                                <span class="badge bg-primary"><?php echo htmlspecialchars($v['slot_number']); ?></span>
                                <small class="d-block text-muted mt-1"><?php echo htmlspecialchars($v['violation_type']); ?></small>
                            </td>
                            <td class="text-end fw-bold text-danger">৳<?php echo number_format($v['fine_amount'], 0); ?></td>
                        </tr>
                    <?php endforeach; ?>
                    <tr class="table-danger">
                        <th>Total Amount:</th>
                        <td class="text-end fs-4 fw-bold text-danger">৳<?php echo number_format($totalAmount, 0); ?></td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="alert alert-warning mt-3">
            <h6><i class="bi bi-exclamation-triangle"></i> Important</h6>
            <ul class="mb-0 small">
                <li>Unpaid fines may result in account restrictions</li>
                <li>Pay at the counter for cash payments</li>
                <li>Keep your receipt for records</li>
            </ul>
        </div>
    </div>
</div>

<script>
// Show/hide input fields based on payment method
document.querySelectorAll('input[name="payment_method"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        var transactionSection = document.getElementById('transaction-id-section');
        var cardSection = document.getElementById('card-number-section');
        var receiptSection = document.getElementById('receipt-id-section');
        var mobilePayments = ['bkash', 'nagad', 'rocket'];
        
        // Hide all sections first
        transactionSection.style.display = 'none';
        cardSection.style.display = 'none';
        receiptSection.style.display = 'none';
        
        // Show relevant section based on payment method
        if (mobilePayments.includes(this.value)) {
            transactionSection.style.display = 'block';
        } else if (this.value === 'card') {
            cardSection.style.display = 'block';
        } else if (this.value === 'cash') {
            receiptSection.style.display = 'block';
        }
        
        // Update payment method visual selection
        document.querySelectorAll('.payment-method').forEach(function(label) {
            label.classList.remove('selected');
        });
        this.nextElementSibling.classList.add('selected');
    });
});

// Format card number with spaces
document.getElementById('card_number').addEventListener('input', function(e) {
    var value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var formatted = value.match(/.{1,4}/g);
    e.target.value = formatted ? formatted.join(' ') : '';
});
</script>

<?php require_once '../includes/footer.php'; ?>
