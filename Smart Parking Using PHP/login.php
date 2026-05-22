<?php
/**
 * User Login
 * Smart Parking Management System
 */
require_once 'includes/auth.php';

// ============================================
// DUMMY LOGIN MODE - No Database Required
// Set to true to use dummy accounts for testing
// ============================================
$DUMMY_MODE = false;

// Dummy users for testing (no database needed)
$dummyUsers = [
    'admin@parking.com' => [
        'id' => 1,
        'name' => 'System Admin',
        'email' => 'admin@parking.com',
        'password' => 'admin123',
        'role' => 'admin'
    ],
    'driver@parking.com' => [
        'id' => 2,
        'name' => 'Demo Driver',
        'email' => 'driver@parking.com',
        'password' => 'driver123',
        'role' => 'driver'
    ],
    'user@parking.com' => [
        'id' => 3,
        'name' => 'Test User',
        'email' => 'user@parking.com',
        'password' => 'user123',
        'role' => 'driver'
    ]
];

// Redirect if already logged in
if (isLoggedIn()) {
    if (isAdmin()) {
        header('Location: admin/dashboard.php');
    } else {
        header('Location: user/dashboard.php');
    }
    exit();
}

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validation
    if (empty($email) || empty($password)) {
        $errors[] = 'Email and password are required';
    }

    if (empty($errors)) {
        $authenticated = false;
        $user = null;

        // DUMMY MODE: Check against dummy users
        if ($DUMMY_MODE) {
            // Make email comparison case-insensitive
            $emailLower = strtolower(trim($email));
            foreach ($dummyUsers as $dummyEmail => $dummyUser) {
                if (strtolower($dummyEmail) === $emailLower && $dummyUser['password'] === $password) {
                    $user = $dummyUser;
                    $authenticated = true;
                    break;
                }
            }
        } else {
            // DATABASE MODE: Check against database
            require_once 'config/db.php';
            $stmt = $pdo->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $authenticated = true;
            }
        }

        if ($authenticated && $user) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['dummy_mode'] = $DUMMY_MODE;

            // Redirect based on role
            if ($user['role'] === 'admin') {
                header('Location: admin/dashboard.php');
            } else {
                header('Location: user/dashboard.php');
            }
            exit();
        } else {
            $errors[] = 'Invalid email or password';
        }
    }
}

$pageTitle = 'Login';
require_once 'includes/header.php';
?>

<div class="row justify-content-center">
    <div class="col-md-5 col-lg-4">
        <div class="card shadow">
            <div class="card-body p-4">
                <h2 class="card-title text-center mb-4">
                    <i class="bi bi-box-arrow-in-right text-primary"></i> Login
                </h2>

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
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="email" name="email" 
                               value="<?php echo htmlspecialchars($email ?? ''); ?>" required autofocus>
                    </div>

                    <div class="mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mb-3">
                        <i class="bi bi-box-arrow-in-right"></i> Login
                    </button>
                </form>

                <div class="text-center">
                    <span class="text-muted">Don't have an account?</span>
                    <a href="register.php">Register here</a>
                </div>

                <hr class="my-4">

                <?php if ($DUMMY_MODE): ?>
                <div class="alert alert-warning mb-0">
                    <h6 class="alert-heading"><i class="bi bi-lightning-fill"></i> Demo Mode Active</h6>
                    <small>No database required! Use these test accounts:</small>
                    <div class="mt-2">
                        <table class="table table-sm table-borderless mb-0" style="font-size: 0.8rem;">
                            <tr>
                                <td><strong>Admin:</strong></td>
                                <td><code>admin@parking.com</code> / <code>admin123</code></td>
                            </tr>
                            <tr>
                                <td><strong>Driver:</strong></td>
                                <td><code>driver@parking.com</code> / <code>driver123</code></td>
                            </tr>
                            <tr>
                                <td><strong>User:</strong></td>
                                <td><code>user@parking.com</code> / <code>user123</code></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <?php else: ?>
                <div class="alert alert-info small mb-0">
                    <strong>Demo Admin:</strong><br>
                    Email: admin@parking.com<br>
                    Password: admin123
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
