<?php
// Include the database connection
include('db.php');

session_start();
// Example: Check if the user is logged in
$isLoggedIn = isset($_SESSION['user']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/pngwing.com.png">
    <title>AutoDream - Home</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Welcome to AutoDream</h1>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="deals.php">Deals</a></li>
                <li><a href="parts.php">Parts</a></li>
            </ul>
        </nav>

        <div class="profile-icon">
            <img src="images/user.png" alt="Profile" />
            <div class="dropdown">
                <?php if ($isLoggedIn): ?>
                    <a href="profile.php">My Profile</a>
                    <a href="logout.php">Logout</a> <!-- Redirect to logout.php to destroy session -->
                <?php else: ?>
                    <a href="login.php">Login</a>
                <?php endif; ?>
            </div>
        </div>
    </header>

    <section class="hero">
        <h2>Your Dream Car Awaits</h2>
        <p>Explore top deals and find the perfect vehicle.</p>
        <button onclick="window.location.href='deals.php'">View Deals</button>
    </section>

    <section class="featured-cars">
        <h3>Featured Cars</h3>
        <div class="car-gallery">
            <img src="images/car1.jpg" alt="Car 1">
            <img src="images/car2.jpg" alt="Car 2">
            <img src="images/car3.jpg" alt="Car 3">
        </div>
    </section>
</body>
</html>
