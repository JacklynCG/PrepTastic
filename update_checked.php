<?php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id']) && isset($_POST['checked'])) {
    $id = intval($_POST['id']);
    $checked = intval($_POST['checked']); // Convert to 0 or 1

    $sql = "UPDATE ingredient SET have_ingredient = $checked WHERE ID = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "error: " . $conn->error;
    }
} else {
    echo "Invalid request";
}

$conn->close();
?>