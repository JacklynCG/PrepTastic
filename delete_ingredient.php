<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    include 'database.php';

    // Get the ingredient ID from the POST request
    $id = intval($_POST['id']);  // Ensure we get a clean integer
    // echo "ID received: $id";  // Log the ID to confirm it's being passed correctly

    // Check if ID is valid
    if ($id <= 0) {
        echo "Error: Invalid ID.";
        exit;  // Exit if ID is not valid
    }

    // SQL query to delete the ingredient by id
    $sql = "DELETE FROM ingredient WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $id);  // Bind the ID as an integer
        $success = $stmt->execute();  // Execute the query
        
        if ($success) {
            echo "success";  // Success response
        } else {
            // Log the error and provide feedback
            echo "Error executing delete query: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error preparing SQL statement.";
    }

    $conn->close();
} else {
    echo "No ID received";  // This will show if no ID is passed from JavaScript
}
?>



