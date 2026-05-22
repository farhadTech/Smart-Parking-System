<?php
/**
 * User Registration
 * Smart Parking Management System
 */
require_once 'includes/auth.php';
require_once 'config/db.php';

// Redirect if already logged in
if (isLoggedIn()) {
    header('Location: user/dashboard.php');
    exit();
}

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    // Validation
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }
    if (empty($password) || strlen($password) < 6) {
        $errors[] = 'Password must be at least 6 characters';
    }
    if ($password !== $confirmPassword) {
        $errors[] = 'Passwords do not match';
    }

    // Check if email already exists
    if (empty($errors)) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $errors[] = 'Email already registered';
        }
    }

    // Create user
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'driver')");
        
        try {
            $stmt->execute([$name, $email, $phone, $hashedPassword]);
            setFlashMessage('success', 'Registration successful! Please login.');
            header('Location: login.php');
            exit();
        } catch (PDOException $e) {
            $errors[] = 'Registration failed. Please try again.';
        }
    }
}

$pageTitle = 'Register';
require_once 'includes/header.php';
?>

<div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
        <div class="card shadow">
            <div class="card-body p-4">
                <h2 class="card-title text-center mb-4">
                    <i class="bi bi-person-plus text-primary"></i> Register
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
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" name="name" 
                               value="<?php echo htmlspecialchars($name ?? ''); ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="email" name="email" 
                               value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone Number</label>
                        <input type="text" class="form-control" id="phone" name="phone" 
                               value="<?php echo htmlspecialchars($phone ?? ''); ?>" 
                               placeholder="01XXXXXXXXX">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" 
                               minlength="6" required>
                        <div class="form-text">Minimum 6 characters</div>
                    </div>

                    <div class="mb-4">
                        <label for="confirm_password" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirm_password" 
                               name="confirm_password" required>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 mb-3">
                        <i class="bi bi-person-plus"></i> Create Account
                    </button>
                </form>

                <div class="text-center">
                    <span class="text-muted">Already have an account?</span>
                    <a href="login.php">Login here</a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
