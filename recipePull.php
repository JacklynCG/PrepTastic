<?php
$servername="localhost";
$username="root";
$password="";
$database ="recipes";

//create connection
$conn = new mysqli($servername, $username, $password, $database);

//catch connection errors
if($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}


function getRecipe($name)
{
    global $conn;
    $query = "SELECT link FROM recipe WHERE name = 'recipeName'" ;
    $result = $conn->query($query);
    return $result->fetch_assoc()['link'];
}

$conn->close();

?>
