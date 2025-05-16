<?php
// get_recipe_details.php
header('Content-Type: application/json');
$id = intval($_GET['id'] ?? 0);

try {
    $pdo = new PDO("mysql:host=localhost;dbname=preptastic", "root", "");
    $stmt = $pdo->prepare("SELECT name, ingredients, instructions FROM recipes WHERE id = ?");
    $stmt->execute([$id]);
    $recipe = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($recipe ?: []);
} catch (Exception $e) {
    echo json_encode(["error" => "Failed to fetch recipe"]);
}
?>
