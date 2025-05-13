<?php
include("database.php");

$sql = "SELECT * FROM recipes";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    echo "<div>";
    echo "<h3>" . htmlspecialchars($row['name']) . "</h3>";
    echo "<p>By " . htmlspecialchars($row['author']) . "</p>";
    echo "<p>Servings: " . $row['servings'] . " | Time: " . $row['time'] . "</p>";
    echo "<p>Ingredients: " . nl2br(htmlspecialchars($row['ingredients'])) . "</p>";
    echo "<a href='" . htmlspecialchars($row['link']) . "' target='_blank'>View Recipe</a>";
    echo "<p>Notes: " . nl2br(htmlspecialchars($row['notes'])) . "</p>";
    echo "<p>Rating: " . $row['rating'] . "/5</p>";
    echo "<form method='POST' action='delete_recipe.php'>
            <input type='hidden' name='id' value='{$row['ID']}'>
            <button type='submit'>Delete</button>
          </form>";
    echo "</div><hr>";
}

mysqli_close($conn);
?>
