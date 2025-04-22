
document.getElementById("createRecipeBtn").addEventListener("click", () => {
    document.getElementById("createFormSection").classList.toggle("hidden");
  });
  

document.addEventListener("DOMContentLoaded", () => {
    const ingredientInput = document.getElementById("ingredientInput");
    const addIngredientBtn = document.getElementById("addIngredientBtn");
    const ingredientList = document.getElementById("ingredientList");
  
    const stepInput = document.getElementById("stepInput");
    const addStepBtn = document.getElementById("addStepBtn");
    const stepList = document.getElementById("stepList");
  
    const form = document.getElementById("recipeForm");
    const cardsContainer = document.getElementById("cardsContainer");
  
    // Add ingredient
    addIngredientBtn.addEventListener("click", () => {
      const ingredient = ingredientInput.value.trim();
      if (ingredient) {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientList.appendChild(li);
        ingredientInput.value = "";
      }
    });
  
    // Add step
    addStepBtn.addEventListener("click", () => {
      const step = stepInput.value.trim();
      if (step) {
        const li = document.createElement("li");
        li.textContent = step;
        stepList.appendChild(li);
        stepInput.value = "";
      }
    });
  
    // Handle Enter key behavior
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const target = e.target;
  
        if (target === ingredientInput) {
          e.preventDefault();
          addIngredientBtn.click();
        } else if (target === stepInput) {
          e.preventDefault();
          addStepBtn.click();
        } else {
          e.preventDefault(); // Prevent form submit on Enter
        }
      }
    });
  
    // Submit and create recipe card
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get basic info
      const name = document.getElementById("recipeName").value.trim();
      const author = document.getElementById("author").value.trim();
      const servings = document.getElementById("servings").value;
      const description = document.getElementById("description").value.trim();
      const hours = document.getElementById("cookTimeHours").value.trim();
      const minutes = document.getElementById("cookTimeMinutes").value.trim();
      const time = `${hours}h ${minutes}m`;
      const notes = document.getElementById("notes").value.trim();
  
      // Get ingredients and steps
      const ingredients = Array.from(ingredientList.children).map(li => li.textContent);
      const steps = Array.from(stepList.children).map(li => li.textContent);
  
      // Create card
      // TODO ADD FUNCTIONALITY TO THE ADD MEAL BUTTON AND POST BUTTON

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Servings:</strong> ${servings}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Time:</strong> ${time}</p>
        <button class="toggleDetails">Show Recipe</button>
        <div class="recipeDetails" style="display: none;">
            <h4>Ingredients:</h4>
            <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <h4>Steps:</h4>
            <ol>${steps.map(s => `<li>${s}</li>`).join("")}</ol>
            <p><strong>Notes:</strong> ${notes}</p>
        </div>

        <button type="addToMeal" id="addToMealBtn">Add to Meal</button>
        <button type="Post" id="postToFeedBtn">Post to Feed</button>
        <button type="Remove" id="recipeRemoveBtn">Delete</button>
        
         
        
      `;
        // Delete card functionality:
        const deleteBtn = card.querySelector("#recipeRemoveBtn");

        deleteBtn.addEventListener("click", function () {
        cardsContainer.removeChild(card);
        });

  
      // Add toggle functionality
      const toggleBtn = card.querySelector(".toggleDetails");
      const details = card.querySelector(".recipeDetails");
  
      toggleBtn.addEventListener("click", () => {
        const isVisible = details.style.display === "block";
        details.style.display = isVisible ? "none" : "block";
        toggleBtn.textContent = isVisible ? "Show Recipe" : "Hide Recipe";
      });
  
      // Add card to container
      cardsContainer.appendChild(card);
  
      // Reset form
      form.reset();
      ingredientList.innerHTML = "";
      stepList.innerHTML = "";
    });

    
  });
  