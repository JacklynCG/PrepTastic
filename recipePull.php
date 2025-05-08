<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "recipes";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Catch connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
header('Content-Type: application/json');
$pdo = new PDO("sqlite:recipes.db"); // Adjust path if needed
$query = $pdo->query("SELECT name, link FROM recipes");
$recipes = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($recipes);
$conn->close();
?>
