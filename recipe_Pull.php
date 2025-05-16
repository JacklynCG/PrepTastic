<?php
header('Content-Type: application/json');
require 'database.php'; // Ensure this connects to your $pdo database
$host = 'localhost';
$db   = 'preptastic';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => false, 'msg' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
// Check if recipe name is provided
if (!isset($_POST['event_name'])) {
    echo json_encode(['status' => false, 'msg' => 'No event name provided']);
    exit;
}

$eventName = $_POST['event_name'];

// Log the raw recipe name for debugging
error_log("Looking up recipe: '" . $eventName . "'");

// Normalize the input
$normalizedEventName = trim(strtolower($eventName));

// Prepare and execute case-insensitive query
$query = $pdo->prepare("
    SELECT name, description, ingredients, steps 
    FROM recipes 
    WHERE TRIM(LOWER(name)) = ?
");
$query->execute([$normalizedEventName]);
$recipe = $query->fetch(PDO::FETCH_ASSOC);

if ($recipe) {
    $ingredients = array_map('trim', explode("\n", $recipe['ingredients'])); // assumes newline-separated ingredients

    echo json_encode([
        'status' => true,
        'data' => [
            'title' => $recipe['name'],
            'description' => $recipe['description'],
            'ingredients' => $ingredients,
            'instructions' => $recipe['steps']
        ]
    ]);
} else {
    echo json_encode(['status' => false, 'msg' => 'Recipe not found']);
}
?>
