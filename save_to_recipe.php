
<?php
header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing recipe ID"]);
    exit;
}

include("database.php");

$id = (int)$input['id'];


if ($result && $row = $result->fetch_assoc()) {
    if ($row['posted_to_feed'] == 3) {
        echo json_encode(["success" => false, "status" => "duplicate"]);
        $conn->close();
        exit;
    }
}

$updateSql = "UPDATE recipes SET posted_to_feed = 0 WHERE id = $id";
if ($conn->query($updateSql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>


