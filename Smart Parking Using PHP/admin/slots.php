<?php
/**
 * Slot Management (Hardware Simulation)
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../includes/dummy_data.php';

requireAdmin();

// Handle slot status toggle (works in both modes, but dummy mode is simulated)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isDummyMode()) {
        // In dummy mode, just show a success message (no actual changes)
        if (isset($_POST['toggle_slot'])) {
            $currentStatus = $_POST['current_status'];
            $newStatus = ($currentStatus === 'available') ? 'occupied' : 'available';
            setFlashMessage('success', 'Demo: Slot status would change to: ' . ucfirst($newStatus));
        } elseif (isset($_POST['toggle_emergency'])) {
            setFlashMessage('success', 'Demo: Emergency status would be toggled');
        } elseif (isset($_POST['set_maintenance'])) {
            setFlashMessage('warning', 'Demo: Slot would be set to maintenance mode');
        }
        header('Location: slots.php');
        exit();
    } else {
        // Database mode - actual changes
        require_once '../config/db.php';
        
        if (isset($_POST['toggle_slot'])) {
            $slotId = $_POST['slot_id'];
            $currentStatus = $_POST['current_status'];
            $newStatus = ($currentStatus === 'available') ? 'occupied' : 'available';
            
            $stmt = $pdo->prepare("UPDATE parking_slots SET status = ? WHERE id = ?");
            $stmt->execute([$newStatus, $slotId]);
            
            setFlashMessage('success', 'Slot status updated to: ' . ucfirst($newStatus));
        }
        
        if (isset($_POST['toggle_emergency'])) {
            $slotId = $_POST['slot_id'];
            $currentEmergency = $_POST['current_emergency'];
            $newEmergency = $currentEmergency ? 0 : 1;
            
            $stmt = $pdo->prepare("UPDATE parking_slots SET is_emergency = ? WHERE id = ?");
            $stmt->execute([$newEmergency, $slotId]);
            
            setFlashMessage('success', 'Emergency status updated');
        }
        
        if (isset($_POST['set_maintenance'])) {
            $slotId = $_POST['slot_id'];
            
            $stmt = $pdo->prepare("UPDATE parking_slots SET status = 'maintenance' WHERE id = ?");
            $stmt->execute([$slotId]);
            
            setFlashMessage('warning', 'Slot set to maintenance mode');
        }
        
        header('Location: slots.php');
        exit();
    }
}

// Get all slots
if (isDummyMode()) {
    $slots = $GLOBALS['dummySlots'];
} else {
    require_once '../config/db.php';
    $slots = $pdo->query("SELECT * FROM parking_slots ORDER BY slot_number")->fetchAll();
}

$pageTitle = 'Slot Management';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-grid-3x3-gap"></i> Slot Management</h2>

<div class="alert alert-info">
    <h5><i class="bi bi-cpu"></i> Hardware Simulation Panel</h5>
    <p class="mb-0">Click on any slot to toggle its status. This simulates IoT sensors detecting car entry/exit.</p>
</div>

<?php if (isDummyMode()): ?>
<div class="alert alert-warning">
    <i class="bi bi-lightning-fill"></i> <strong>Demo Mode:</strong> Changes are simulated only. Connect database for real updates.
</div>
<?php endif; ?>

<!-- Legend -->
<div class="legend mb-4">
    <div class="legend-item">
        <div class="legend-color available"></div>
        <span>Available (Click to occupy)</span>
    </div>
    <div class="legend-item">
        <div class="legend-color occupied"></div>
        <span>Occupied (Click to free)</span>
    </div>
    <div class="legend-item">
        <div class="legend-color reserved"></div>
        <span>Emergency Only</span>
    </div>
    <div class="legend-item">
        <div class="legend-color maintenance"></div>
        <span>Maintenance</span>
    </div>
</div>

<!-- Slots Grid -->
<div class="row g-3">
    <?php foreach ($slots as $slot): ?>
        <?php
        $statusClass = $slot['status'];
        if ($slot['is_emergency'] && $slot['status'] === 'available') {
            $statusClass = 'reserved';
        }
        ?>
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="card shadow-sm">
                <div class="card-body p-2 text-center">
                    <h5 class="mb-2">
                        <span class="badge bg-<?php 
                            echo $slot['status'] === 'available' ? 'success' : 
                                ($slot['status'] === 'occupied' ? 'danger' : 
                                ($slot['status'] === 'reserved' ? 'primary' : 'secondary')); 
                        ?> fs-5">
                            <?php echo htmlspecialchars($slot['slot_number']); ?>
                        </span>
                    </h5>
                    
                    <p class="mb-1 small">
                        <span class="badge bg-light text-dark"><?php echo ucfirst($slot['type']); ?></span>
                        <?php if ($slot['is_emergency']): ?>
                            <span class="badge bg-info">Emergency</span>
                        <?php endif; ?>
                    </p>
                    <p class="mb-2 small text-muted">৳<?php echo number_format($slot['price_per_hour'], 0); ?>/hr</p>
                    
                    <!-- Toggle Button (Hardware Simulation) -->
                    <?php if ($slot['status'] !== 'maintenance'): ?>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="slot_id" value="<?php echo $slot['id']; ?>">
                            <input type="hidden" name="current_status" value="<?php echo $slot['status']; ?>">
                            <button type="submit" name="toggle_slot" 
                                    class="btn btn-sm <?php echo $slot['status'] === 'available' ? 'btn-success' : 'btn-danger'; ?> w-100 mb-1">
                                <i class="bi bi-<?php echo $slot['status'] === 'available' ? 'car-front' : 'box-arrow-right'; ?>"></i>
                                <?php echo $slot['status'] === 'available' ? 'Simulate Entry' : 'Simulate Exit'; ?>
                            </button>
                        </form>
                    <?php endif; ?>
                    
                    <!-- Emergency Toggle -->
                    <form method="POST" class="d-inline">
                        <input type="hidden" name="slot_id" value="<?php echo $slot['id']; ?>">
                        <input type="hidden" name="current_emergency" value="<?php echo $slot['is_emergency']; ?>">
                        <button type="submit" name="toggle_emergency" 
                                class="btn btn-sm <?php echo $slot['is_emergency'] ? 'btn-info' : 'btn-outline-info'; ?> w-100 mb-1">
                            <i class="bi bi-exclamation-diamond"></i>
                            <?php echo $slot['is_emergency'] ? 'Remove Emergency' : 'Set Emergency'; ?>
                        </button>
                    </form>
                    
                    <!-- Maintenance Toggle -->
                    <?php if ($slot['status'] !== 'maintenance'): ?>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="slot_id" value="<?php echo $slot['id']; ?>">
                            <button type="submit" name="set_maintenance" 
                                    class="btn btn-sm btn-outline-secondary w-100">
                                <i class="bi bi-tools"></i> Maintenance
                            </button>
                        </form>
                    <?php else: ?>
                        <form method="POST" class="d-inline">
                            <input type="hidden" name="slot_id" value="<?php echo $slot['id']; ?>">
                            <input type="hidden" name="current_status" value="maintenance">
                            <button type="submit" name="toggle_slot" 
                                    class="btn btn-sm btn-warning w-100">
                                <i class="bi bi-check-circle"></i> End Maintenance
                            </button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<?php require_once '../includes/footer.php'; ?>
