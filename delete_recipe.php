<?php
include("database.php");

$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($input['id'])) {
    $id = $input['id'];
    $sql = "DELETE FROM recipes WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);

    if (mysqli_stmt_execute($stmt)) {
        echo "Deleted!";
    } else {
        echo "Error deleting: " . mysqli_error($conn);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Invalid request or ID missing.";
}

mysqli_close($conn);
?>
