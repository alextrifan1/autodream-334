<?php
// Start the session to track the user's login status
session_start();

// Check if the user is logged in, otherwise redirect to the login page
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit();
}

// Database connection (change to your actual database credentials)
$conn = new mysqli('localhost', 'root', '', 'your_database');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user data from the database
$username = $_SESSION['user'];
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Handle profile picture update (this is just a placeholder, you'll need to handle file uploads)
if (isset($_POST['update_picture'])) {
    // Handle file upload logic here
}

// Handle password update
if (isset($_POST['update_password'])) {
    $currentPassword = $_POST['current_password'];
    $newPassword = $_POST['new_password'];
    
    // Check if the current password matches the stored password (you should hash it)
    if (password_verify($currentPassword, $user['password'])) {
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
        $updateStmt->bind_param('ss', $hashedPassword, $username);
        $updateStmt->execute();
    } else {
        $passwordError = "Current password is incorrect.";
    }
}

// Handle email update
if (isset($_POST['update_email'])) {
    $newEmail = $_POST['new_email'];
    $password = $_POST['email_password'];
    
    // Check if the password matches the current password
    if (password_verify($password, $user['password'])) {
        $updateStmt = $conn->prepare("UPDATE users SET email = ? WHERE username = ?");
        $updateStmt->bind_param('ss', $newEmail, $username);
        $updateStmt->execute();
    } else {
        $emailError = "Password is incorrect.";
    }
}

// Handle username update
if (isset($_POST['update_username'])) {
    $newUsername = $_POST['new_username'];
    $password = $_POST['username_password'];
    
    // Check if the password matches the current password
    if (password_verify($password, $user['password'])) {
        $updateStmt = $conn->prepare("UPDATE users SET username = ? WHERE username = ?");
        $updateStmt->bind_param('ss', $newUsername, $username);
        $updateStmt->execute();
        $_SESSION['user'] = $newUsername;  // Update the session
    } else {
        $usernameError = "Password is incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="css/profile.css">
</head>
<body>
    <div class="profile-header">
        <!-- Display profile picture -->
        <img src="images/<?php echo $user['profile_picture'] ?? 'default.jpg'; ?>" alt="Profile Picture" class="profile-picture">
        <h1 class="username"><?php echo htmlspecialchars($user['username']); ?></h1>
    </div>

    <div class="tab-container">
        <button class="tab-button" onclick="showTab('posts')">My Posts</button>
        <button class="tab-button" onclick="showTab('messages')">Messages</button>
        <button class="tab-button" onclick="showTab('paid-items')">Paid Items</button>
        <button class="tab-button" onclick="showTab('settings')">Settings</button>
    </div>

    <div id="posts" class="tab-content">
        <h2>My Posts</h2>
        <div class="post">
            <img src="images/car1.jpg" alt="Car" class="post-image">
            <p>Car model, year, specifications...</p>
        </div>
    </div>

    <div id="messages" class="tab-content">
        <h2>Messages</h2>
        <p>Your messages will appear here.</p>
    </div>

    <div id="paid-items" class="tab-content">
        <h2>Paid Items</h2>
        <p>Your purchased items will be displayed here.</p>
    </div>

    <div id="settings" class="tab-content">
        <h3>Settings</h3>
        <ul class="settings-menu">
            <li>
                <button class="settings-option" onclick="togglePictureMenu()">Change Profile Picture <span class="arrow-icon">▼</span></button>
                <div id="picture-menu" class="hidden">
                    <div class="inner-box">
                        <form method="POST" enctype="multipart/form-data">
                            <label for="profile-picture">Upload New Picture:</label>
                            <input type="file" id="profile-picture" name="profile-picture" />
                            <button type="submit" name="update_picture" class="save-button">Save</button>
                        </form>
                    </div>
                </div>
            </li>
            <li>
                <button class="settings-option" onclick="togglePasswordMenu()">Change Password <span class="arrow-icon">▼</span></button>
                <div id="password-menu" class="hidden">
                    <div class="inner-box">
                        <form method="POST">
                            <label for="current-password">Current Password:</label>
                            <input type="password" id="current-password" name="current_password" placeholder="Enter current password" required />
                            <label for="new-password">New Password:</label>
                            <input type="password" id="new-password" name="new_password" placeholder="Enter new password" required />
                            <button type="submit" name="update_password" class="save-button">Save</button>
                        </form>
                    </div>
                    <?php if (isset($passwordError)): ?>
                        <p style="color:red;"><?php echo $passwordError; ?></p>
                    <?php endif; ?>
                </div>
            </li>
            <li>
                <button class="settings-option" onclick="toggleEmailMenu()">Change Email <span class="arrow-icon">▼</span></button>
                <div id="email-menu" class="hidden">
                    <div class="inner-box">
                        <form method="POST">
                            <label for="new-email">New Email:</label>
                            <input type="email" id="new-email" name="new_email" placeholder="Enter new email" required />
                            <label for="email-password">Password:</label>
                            <input type="password" id="email-password" name="email_password" placeholder="Confirm password" required />
                            <button type="submit" name="update_email" class="save-button">Save</button>
                        </form>
                    </div>
                    <?php if (isset($emailError)): ?>
                        <p style="color:red;"><?php echo $emailError; ?></p>
                    <?php endif; ?>
                </div>
            </li>
            <li>
                <button class="settings-option" onclick="toggleUsernameMenu()">Change Username <span class="arrow-icon">▼</span></button>
                <div id="username-menu" class="hidden">
                    <div class="inner-box">
                        <form method="POST">
                            <label for="new-username">New Username:</label>
                            <input type="text" id="new-username" name="new_username" placeholder="Enter new username" required />
                            <label for="username-password">Password:</label>
                            <input type="password" id="username-password" name="username_password" placeholder="Confirm password" required />
                            <button type="submit" name="update_username" class="save-button">Save</button>
                        </form>
                    </div>
                    <?php if (isset($usernameError)): ?>
                        <p style="color:red;"><?php echo $usernameError; ?></p>
                    <?php endif; ?>
                </div>
            </li>
        </ul>
    </div>

    <script src="js/profile.js"></script>
</body>
</html>
