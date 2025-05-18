<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "recipes";


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function getRecipe($name)
{
    global $conn;
  
    $stmt = $conn->prepare("SELECT link FROM recipe WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    return $row ? $row['link'] : null;
}

$conn->close();
?>
