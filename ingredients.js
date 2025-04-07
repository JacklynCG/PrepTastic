/*When the "Add Ingredient" button is clicked:
    - Get the value of the ingredient name from the input field.
    - If the ingredient name is not empty:
        - Create a new label.
        - Create a new checkbox.
        - Set the label’s text to the ingredient name.
        - Add the checkbox and label to the container.
    - If the ingredient name is empty:
        - Show an alert message.
    - Clear the input field after adding the ingredient.
 */

    document.getElementById("add-ingredient-btn").addEventListener("click", addIngredient);
    document.getElementById("ingredient-input").addEventListener("keypress", function(event) {
        
        if (event.key === "Enter") {
            addIngredient();
        
        }
    });
    
    function addIngredient() {
        const input = document.getElementById("ingredient-input");
        const ingredientName = input.value.trim();
    
        if (ingredientName === "") {
            alert("Please enter an ingredient name.");
            return;
        }
    
        const container = document.getElementById("ingredient-container");
        const label = document.createElement("label");
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"; 
    
        // Create a new span to hold the ingredient name
        const span = document.createElement("span");
        span.textContent = ingredientName;
    
        // Append the checkbox and span to the label
        label.appendChild(checkbox);
        label.appendChild(span);
    
        // Append the label to the container
        container.appendChild(label);
        
        // Add a line break to separate each checkbox
        container.appendChild(document.createElement("br"));
    
        // Clear the input field after adding the ingredient
        input.value = "";
    }
    
