<?php
// show_recipes.php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=localhost;dbname=preptastic", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT id, name FROM recipes ORDER BY name ASC");
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($recipes);
} catch (Exception $e) {
    echo json_encode([]);
}
?>
