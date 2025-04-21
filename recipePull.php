<?php
$servername="localhost";
$usernaem="root";
$password="";
$database ="recipe";

//create connection
$conn = new mysqli($servername, $usernaem, $password, $database);

//catch connection errors
if($conn->connect_error)
{
    die("Connection failed: " . $conn-connect_error);
}

$query = "SELECT * FROM recipe";
$result = $conn->query($query);

if (result->num_rows >0)
{
    while($row = $result->fetch_assoc())
    {
        echo "Recipe Name: " . $row["recipe_name"]. "<br>";
           $row["recipe_servings"]. "<br>";
           $row["recipe_ingredients"]. "<br>";
           $row["recipe_notes"]. "<br>";
           $row["recipe_rating"]. "<br>";
           $row["recipe_time"]. "<br>";
           $row["recipe_author"]. "<br>";
           $row["recipe_link"]. "<br>";
    }
}

else 
{
    echo "0 results";
}

$conn->close();

?>
