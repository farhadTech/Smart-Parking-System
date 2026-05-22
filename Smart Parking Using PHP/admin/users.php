<?php
/**
 * User Management
 * Smart Parking Management System
 */
require_once '../includes/auth.php';
require_once '../config/db.php';

requireAdmin();

// Handle user deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_user'])) {
    $userId = $_POST['user_id'];
    
    // Don't allow deleting yourself or other admins
    $checkStmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
    $checkStmt->execute([$userId]);
    $user = $checkStmt->fetch();
    
    if ($user && $user['role'] !== 'admin') {
        $deleteStmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $deleteStmt->execute([$userId]);
        setFlashMessage('success', 'User deleted successfully');
    } else {
        setFlashMessage('danger', 'Cannot delete admin users');
    }
    header('Location: users.php');
    exit();
}

// Get all users
$users = $pdo->query("
    SELECT u.*, 
           (SELECT COUNT(*) FROM bookings WHERE user_id = u.id) as booking_count,
           (SELECT COUNT(*) FROM violations v JOIN bookings b ON v.booking_id = b.id WHERE b.user_id = u.id AND v.status = 'unpaid') as unpaid_fines
    FROM users u
    ORDER BY u.created_at DESC
")->fetchAll();

$pageTitle = 'User Management';
require_once '../includes/header.php';
?>

<h2 class="mb-4"><i class="bi bi-people"></i> User Management</h2>

<div class="table-responsive">
    <table class="table table-striped table-hover bg-white">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Bookings</th>
                <th>Unpaid Fines</th>
                <th>Registered</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td>#<?php echo $user['id']; ?></td>
                    <td><?php echo htmlspecialchars($user['name']); ?></td>
                    <td><?php echo htmlspecialchars($user['email']); ?></td>
                    <td><?php echo htmlspecialchars($user['phone'] ?? 'N/A'); ?></td>
                    <td>
                        <span class="badge bg-<?php echo $user['role'] === 'admin' ? 'danger' : 'primary'; ?>">
                            <?php echo ucfirst($user['role']); ?>
                        </span>
                    </td>
                    <td><?php echo $user['booking_count']; ?></td>
                    <td>
                        <?php if ($user['unpaid_fines'] > 0): ?>
                            <span class="badge bg-danger"><?php echo $user['unpaid_fines']; ?> unpaid</span>
                        <?php else: ?>
                            <span class="text-success">None</span>
                        <?php endif; ?>
                    </td>
                    <td><?php echo date('M d, Y', strtotime($user['created_at'])); ?></td>
                    <td>
                        <?php if ($user['role'] !== 'admin'): ?>
                            <form method="POST" class="d-inline" 
                                  onsubmit="return confirm('Are you sure you want to delete this user?');">
                                <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                <button type="submit" name="delete_user" class="btn btn-sm btn-danger">
                                    <i class="bi bi-trash"></i>
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

<?php require_once '../includes/footer.php'; ?>
