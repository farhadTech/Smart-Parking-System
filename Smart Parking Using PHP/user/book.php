<?php
/**
 * Book a Parking Slot
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireLogin();

if (isAdmin()) {
    header('Location: ../admin/dashboard.php');
    exit();
}

$slotId = $_GET['slot_id'] ?? null;
$errors = [];

// Get slot details
if (!$slotId) {
    setFlashMessage('danger', 'No slot selected');
    header('Location: dashboard.php');
    exit();
}

$slotQuery = $pdo->prepare("SELECT * FROM parking_slots WHERE id = ?");
$slotQuery->execute([$slotId]);
$slot = $slotQuery->fetch();

if (!$slot) {
    setFlashMessage('danger', 'Slot not found');
    header('Location: dashboard.php');
    exit();
}

if ($slot['status'] !== 'available') {
    setFlashMessage('danger', 'This slot is not available for booking');
    header('Location: dashboard.php');
    exit();
}

if ($slot['is_emergency']) {
    setFlashMessage('danger', 'This is an emergency slot and cannot be booked');
    header('Location: dashboard.php');
    exit();
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $vehicleNumber = strtoupper(trim($_POST['vehicle_number'] ?? ''));
    $startTime = $_POST['start_time'] ?? '';
    $endTime = $_POST['end_time'] ?? '';

    // Validation
    if (empty($vehicleNumber)) {
        $errors[] = 'Vehicle number is required';
    }
    if (empty($startTime) || empty($endTime)) {
        $errors[] = 'Start and end times are required';
    }
    if (strtotime($endTime) <= strtotime($startTime)) {
        $errors[] = 'End time must be after start time';
    }

    if (empty($errors)) {
        // Calculate total cost
        $hours = ceil((strtotime($endTime) - strtotime($startTime)) / 3600);
        $totalCost = $hours * $slot['price_per_hour'];

        try {
            $pdo->beginTransaction();

            // Create booking
            $bookingStmt = $pdo->prepare("
                INSERT INTO bookings (user_id, slot_id, vehicle_number, start_time, end_time, total_cost, status)
                VALUES (?, ?, ?, ?, ?, ?, 'active')
            ");
            $bookingStmt->execute([
                getCurrentUserId(),
                $slotId,
                $vehicleNumber,
                $startTime,
                $endTime,
                $totalCost
            ]);
            $bookingId = $pdo->lastInsertId();

            // Create pending payment
            $paymentStmt = $pdo->prepare("
                INSERT INTO payments (booking_id, amount, payment_status)
                VALUES (?, ?, 'pending')
            ");
            $paymentStmt->execute([$bookingId, $totalCost]);

            // Update slot status
            $updateSlot = $pdo->prepare("UPDATE parking_slots SET status = 'occupied' WHERE id = ?");
            $updateSlot->execute([$slotId]);

            $pdo->commit();

            setFlashMessage('success', 'Booking successful! Please proceed to payment.');
            header('Location: my-bookings.php');
            exit();

        } catch (Exception $e) {
            $pdo->rollBack();
            $errors[] = 'Booking failed. Please try again.';
        }
    }
}

$pageTitle = 'Book Slot ' . $slot['slot_number'];
require_once '../includes/header.php';
?>

<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
        <li class="breadcrumb-item active">Book Slot</li>
    </ol>
</nav>

<div class="row">
    <div class="col-lg-8">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0"><i class="bi bi-calendar-plus"></i> Book Parking Slot</h5>
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
                    <div class="mb-3">
                        <label for="vehicle_number" class="form-label">Vehicle Number (License Plate)</label>
                        <input type="text" class="form-control" id="vehicle_number" name="vehicle_number" 
                               value="<?php echo htmlspecialchars($_POST['vehicle_number'] ?? ''); ?>"
                               placeholder="e.g., DHAKA METRO 12-3456" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="start_time" class="form-label">Start Time</label>
                            <input type="datetime-local" class="form-control" id="start_time" name="start_time" 
                                   value="<?php echo htmlspecialchars($_POST['start_time'] ?? ''); ?>" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="end_time" class="form-label">End Time</label>
                            <input type="datetime-local" class="form-control" id="end_time" name="end_time" 
                                   value="<?php echo htmlspecialchars($_POST['end_time'] ?? ''); ?>" required>
                        </div>
                    </div>

                    <div class="alert alert-info">
                        <i class="bi bi-info-circle"></i> Estimated cost will be calculated based on the duration at <strong>৳<?php echo number_format($slot['price_per_hour'], 0); ?>/hour</strong>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Confirm Booking
                        </button>
                        <a href="dashboard.php" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card shadow">
            <div class="card-header">
                <h5 class="mb-0">Slot Details</h5>
            </div>
            <div class="card-body">
                <table class="table table-borderless">
                    <tr>
                        <th>Slot Number:</th>
                        <td><span class="badge bg-primary fs-5"><?php echo htmlspecialchars($slot['slot_number']); ?></span></td>
                    </tr>
                    <tr>
                        <th>Type:</th>
                        <td><?php echo ucfirst($slot['type']); ?></td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td class="text-success fw-bold">৳<?php echo number_format($slot['price_per_hour'], 0); ?>/hour</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td><span class="badge bg-success">Available</span></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>

<?php require_once '../includes/footer.php'; ?>
