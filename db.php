<?php
// db.php - Database connection file

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";  // Default password for XAMPP is empty
$dbname = "autodream";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
