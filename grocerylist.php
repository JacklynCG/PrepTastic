<?php
include 'database.php';

header('Content-Type: application/json');

$sql = "SELECT ID, name, amount FROM ingredient WHERE have_ingredient = 0";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$ingredients = [];
while ($row = mysqli_fetch_assoc($result)) {
    $ingredients[] = $row;
}

echo json_encode($ingredients);
$conn->close();
?>
