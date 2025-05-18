<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$recipe_id = intval($data['recipe_id']);
$assign_date = $data['assign_date'];
$assign_time = $data['assign_time'] ?? null;
$note = $data['note'] ?? null;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=preptastic", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO recipe_calendar (recipe_id, assign_date, assign_time, note) VALUES (?, ?, ?, ?)");
    $stmt->execute([$recipe_id, $assign_date, $assign_time, $note]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
