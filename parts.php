<?php
// Start session and check if the user is logged in
session_start();
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

// Get car parts from the database
$sql = "SELECT * FROM car_parts";  // Assuming a table 'car_parts' exists
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista Anunțuri - AutoDream</title>
    <link rel="stylesheet" href="css/parts.css">
</head>
<body>

    <header>
        <h1>AutoDream - Anunțuri piese auto</h1>
        <nav>
            <ul>
                <li><a href="index.php">Acasă</a></li>
                <li><a href="parts.php">Anunțuri Piese</a></li>
                <!-- Add other navigation items here -->
            </ul>
        </nav>
    </header>

    <main>
        <h2>Listează Piesele Disponibile</h2>
        <div class="parts-listing">
            <?php
            if ($result->num_rows > 0) {
                // Loop through the parts and display each one
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="part-item">';
                    echo '<h3><a href="frontend/src/listing.php?id=' . $row['id'] . '">' . htmlspecialchars($row['name']) . '</a></h3>';
                    echo '<p>Categorie: ' . htmlspecialchars($row['category']) . '</p>';
                    echo '<p>Preț: ' . htmlspecialchars($row['price']) . ' EUR</p>';
                    echo '<img src="images/' . htmlspecialchars($row['image']) . '" alt="' . htmlspecialchars($row['name']) . '" />';
                    echo '<button><a href="frontend/src/listing.php?id=' . $row['id'] . '">Vezi Detalii</a></button>';
                    echo '</div>';
                }
            } else {
                echo '<p>Nu există piese disponibile momentan.</p>';
            }
            ?>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 AutoDream. Toate drepturile rezervate.</p>
    </footer>

    <script src="script.js"></script>

</body>
</html>

<?php
// Close the database connection
$conn->close();
?>
