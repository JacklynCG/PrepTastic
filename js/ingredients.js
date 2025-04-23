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

        const inputAmount = document.getElementById("ingredient-amount");
        const ingredientAmount = inputAmount.value.trim();

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
    
        // Span to hold the ingredient name
        const span = document.createElement("span");
        span.textContent = ingredientName;

        const spanAmount = document.createElement("span");
        spanAmount.textContent = ingredientAmount;
    
        //Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = " X ";
        removeBtn.classList.add("remove-btn");
        
        removeBtn.addEventListener("click", function() {
            container.removeChild(label);
            // container.removeChild(br);
        });

        // to get line through full label when checkbox checked
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.classList.add("checked");
            } else {
                label.classList.remove("checked");
            }
        });        
    
        // Append the checkbox, span, and remove button to the label
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
        input.value = "";
        inputAmount.value = "";
    }
    