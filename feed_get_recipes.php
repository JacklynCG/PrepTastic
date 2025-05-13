<?php
include("database.php");

$query = "SELECT * FROM recipes WHERE posted_to_feed = 1 OR posted_to_feed = 3 ORDER BY id DESC";



$result = $conn->query($query);

$recipes = [];

while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

echo json_encode($recipes);
?>

