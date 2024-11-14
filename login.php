<?php
session_start();

// Include the database connection
include('db.php');

// Ensure the form is submitted with the necessary POST data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Check if the username exists in the database
    $stmt = $conn->prepare('SELECT id, username, password FROM users WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // User exists, now check the password
        $stmt->bind_result($id, $db_username, $db_password);
        $stmt->fetch();

        if (password_verify($password, $db_password)) {
            // Password is correct, start the session
            $_SESSION['user'] = $db_username;
            echo json_encode(["status" => "success", "message" => "Login successful"]);
        } else {
            // Incorrect password
            echo json_encode(["status" => "error", "message" => "Incorrect password"]);
        }
    } else {
        // Username doesn't exist
        echo json_encode(["status" => "error", "message" => "Username does not exist"]);
    }

    // Close the statement
    $stmt->close();
    exit(); // End the script after returning a response
}

// Close the database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - AutoDream</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="login-container">
        <h2>Login to AutoDream</h2>

        <!-- Start of the login form -->
        <form id="loginForm" method="POST" action="login.php">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>

        <!-- Display error message if login fails -->
        <div class="error-message" id="error-message"></div>

        <div class="signup-message">
            <p>Don't have an account? <a href="signup.php">Sign up here</a></p>
        </div>
    </div>

    <script src="js/login.js"></script>
</body>
</html>
