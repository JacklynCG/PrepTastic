
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
    
        //name
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

        });

        //checkbox
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.classList.add("checked");
            } else {
                label.classList.remove("checked");
            }
        });        

        const space = document.createTextNode(": ");
        label.appendChild(checkbox);
        label.appendChild(span);
        label.appendChild(space);
        label.appendChild(spanAmount);
        label.appendChild(removeBtn);
    

        container.appendChild(label);

        input.value = "";
        inputAmount.value = "";
    }
    