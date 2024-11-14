<?php
// Start the session
session_start();

// Database connection
$conn = new mysqli('localhost', 'root', '', 'autodream'); // Change 'autodream' to your actual database name

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect and sanitize input
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Validate the input (check if username or email is empty)
    if (empty($username) || empty($email) || empty($password)) {
        $error_message = "All fields are required.";
    } else {
        // Check if username or email already exists in the database
        $stmt = $conn->prepare('SELECT * FROM users WHERE username = ? OR email = ?');
        $stmt->bind_param('ss', $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // If username or email exists, show an error message
            $error_message = "Username or email already exists.";
        } else {
            // Hash the password securely
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);

            // Set the default profile picture
            $default_profile_picture = 'images/user.png';

            // Insert the new user into the database, including the default profile picture
            $stmt = $conn->prepare('INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)');
            $stmt->bind_param('ssss', $username, $email, $hashed_password, $default_profile_picture);
            $stmt->execute();

            // Set session or redirect to login page
            $_SESSION['user'] = $username; // Log the user in immediately after registration
            header('Location: login.php'); // Redirect to the login page
            exit();
        }
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - AutoDream</title>
    <link rel="stylesheet" href="css/signup.css">
</head>
<body>
    <div class="signup-container">
        <div class="image-container">
            <img src="images/pngwing.com.png" alt="Car" />
        </div>
        <div class="form-container">
            <h2>Create an Account</h2>

            <!-- Sign-up Form -->
            <form action="signup.php" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit">Sign Up</button>
            </form>

            <!-- Display error message if any -->
            <?php if (isset($error_message)): ?>
                <p style="color:red;"><?php echo $error_message; ?></p>
            <?php endif; ?>

            <p class="login-link">Already have an account? <a href="login.php">Log in here</a></p>
        </div>
    </div>
</body>
</html>
