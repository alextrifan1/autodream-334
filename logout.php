<?php
// Start the session
session_start();

// Destroy the session to log the user out
session_unset();   // Unsets all session variables
session_destroy(); // Destroys the session

// Redirect to homepage or login page
header('Location: index.php'); // Or use 'login.php' if you want to send them to the login page
exit();
?>
