
<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "preptastic");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit;
}

$name = $conn->real_escape_string($input['name']);
$author = $conn->real_escape_string($input['author']);
$description = $conn->real_escape_string($input['description']);
$servings = (int)$input['servings'];
$time = $conn->real_escape_string($input['time']);
$ingredients = $conn->real_escape_string($input['ingredients']);
$steps = $conn->real_escape_string($input['steps']);
$notes = $conn->real_escape_string($input['notes']);
$link = $conn->real_escape_string($input['link']);


$sql = "INSERT INTO recipes (name, author, description, servings, time, ingredients, notes, steps, link, posted_to_feed)
        VALUES ('$name', '$author', '$description', $servings, '$time', '$ingredients', '$notes', '$steps', '$link', 0)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>

