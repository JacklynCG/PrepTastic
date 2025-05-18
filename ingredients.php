<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/favicon_io/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/ingredients.css">
    <title>Ingredients</title>
</head>

<body>

  <!--HEADER-->
  <header class = "header">
    <div class="header">
      <a href="./calendar1.html">
      <img src="./images/logo/logo-transparent-png.png" alt="Preptastic Logo Header">
      </a>
    </div>
  </header>

  <div class = "navbar">
    <ul>
      <li><a href="./help.html">Help</a></li>
      <li><a href="./ingredients.php">Ingredients</a></li>
      <li><a href="./recipes.html">Recipes</a></li>
      <li><a href="./calendar1.html">Calendar</a></li>
      <li><a href="./feed.html">Feed</a></li>
    </ul>
  </div>

  <section id="header-title">
    <h1>Ingredients</h1>
    <hr>
  </section>

  <section id="page-section">
    <h2>Your Ingredients</h2>

    <!--Right now I am just trying to get the "checkmark" feature to work, where when ingredients are clicked on
    it will make the words a light grey to signify that the user owns that ingredient.-->

    <!--Basic Ingredient Feature that allows user to continously add ingredients to the list-->
    <form action="./ingredients.php" method="post">
      <input type="text" id="ingredient-input" name="ingredient-input" placeholder="Enter ingredient name">
      <input type="text" id="ingredient-amount" name="ingredient-amount" placeholder="Enter amount needed">
      <button type="submit" id="add-ingredient-btn">Add Ingredient</button>
    </form>

    <div class="ingredient-container" id="ingredient-container">
    </div>

    <script>
      function addIngredient() {
        const ingredientName = name;
        const ingredientAmount = amount;
        const ingredientID = id;

        if (ingredientName === "") {
            alert("Please enter an ingredient name.");
            return;
        }

        if (ingredientAmount === "") {
            alert("Please enter an amount.");
            return;
        }
    
        const container = document.getElementById("ingredient-container");

        const label = document.createElement("label");
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isChecked;
        if (isChecked) {
          label.classList.add("checked");
        }
    
       
        const span = document.createElement("span");
        span.textContent = ingredientName;

        const spanAmount = document.createElement("span");
        spanAmount.textContent = ingredientAmount;
    
        //Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = " X ";
        removeBtn.classList.add("remove-btn");
        removeBtn.setAttribute("data-id", ingredientID);
        
        // remove button functionality with removing label from container
        // and removing the selected ingredient from the database by getting that ingredient's ID
        // ingredient ID is saved as an attribute for the label it is stored as
        removeBtn.addEventListener("click", function() {
          const ingredientId = this.getAttribute("data-id");
          // console.log("Ingredient ID being sent: ", ingredientId);  // Log the ID

          fetch('delete_ingredient.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(ingredientID)
          })
          // .then(response => response.text()) {}
          .then(response => {
            // console.log("Response Status: ", response.status); // Log the HTTP response status for debugging
            return response.text();  // Get the response text
          })
          .then(data => {
            // console.log("Delete response from server:", data); // Log the raw response for debugging
            if (data.trim() === "success") {
              container.removeChild(label);
            } else {
              alert("Failed to delete ingredient.");
              console.error(data);
            }
          });
        });

        // to get line through full label when checkbox checked
        checkbox.addEventListener("change", function () {
          const checkedVal = checkbox.checked ? 1 : 0;

          if (checkbox.checked) {
                label.classList.add("checked");
          } else {
                label.classList.remove("checked");
          }

          fetch('update_checked.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(ingredientID) + '&checked=' + checkedVal
          })
          .then(response => response.text())
          .then(data => {
            if (data.trim() !== "success") {
                alert("Failed to update checked status.");
                console.error(data);
            }
          });

          console.log("Added:", name, isChecked);

        });      
    
       
        const space = document.createTextNode(": ");
        label.appendChild(checkbox);
        label.appendChild(span);
        label.appendChild(space);
        label.appendChild(spanAmount);
        label.appendChild(removeBtn);
    
        //Spacing
        // const br = document.createElement("br");
        container.appendChild(label);
        // container.appendChild(br);

        // Clear the input field after adding the ingredient
        ingredientName.value = "";
        ingredientAmount.value = "";
      }
    </script>

    <?php
      include 'database.php';

      if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['ingredient-input'], $_POST['ingredient-amount'])) {
        $Name = $_POST['ingredient-input'];
        $Amount = $_POST['ingredient-amount'];
        // Checkbox (need to figure out how to save this info)

        $sql = "INSERT INTO ingredient (name, amount)
        VALUES ('$Name', '$Amount')";

        if ($conn->query($sql) === False) {
            echo "Error: ", $sql, "<br>", $conn->error;
        }
      }

      $sql_retrieve = "SELECT * FROM ingredient";
      $result = mysqli_query($conn, $sql_retrieve);

      if ($conn->query($sql_retrieve) === False) {
        echo "Error: ", $sql_retrieve, "<br>", $conn->error;
      }

      $ingredients = [];
      while ($row = mysqli_fetch_assoc($result)) {
        $ingredients[] = $row;
      }

      
      foreach ($ingredients as $key => $ingredient) {
        $checked = $ingredient['have_ingredient']; // == 1 ? 'true' : 'false';
        echo "<script>var name = '$ingredient[name]'</script>";
        echo "<script>var amount = '$ingredient[amount]'</script>";
        echo "<script>var id = '$ingredient[ID]'</script>";
        echo "<script>var isChecked = $checked</script>";
        echo "<script>addIngredient()</script>";
      }
      
      $conn->close();
    ?>
  
  </section>

  <br>
  <br>
  <footer class="footer">
    <div class="footer-content">
      <p><strong>Feel free to contact us with any questions!</strong></p>
      <p>Phone number: 000-000-0000</p>
      <p>Email: <a href="mailto:preptastic@fakeEmail.com">preptastic@fakeEmail.com</a></p>
      <p>Instagram: <a href="fakelink.html">@preptasticmealprep</a></p>
    </div>
    <div class="footer-logo">
      <img src="./images/logo/small-logo-transparent-png.png" alt="Small Preptastic Icon">
    </div>
  </footer>

</body>
</html>