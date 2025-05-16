<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    include 'database.php';

    $id = intval($_POST['id']); 



    if ($id <= 0) {
        echo "Error: Invalid ID.";
        exit; 
    }

    $sql = "DELETE FROM ingredient WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $id);  
        $success = $stmt->execute(); 
        
        if ($success) {
            echo "success"; 
        } else {
           
            echo "Error executing delete query: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error preparing SQL statement.";
    }

    $conn->close();
} else {
    echo "No ID received";
}
?>



