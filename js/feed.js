document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById("cardsContainer");
  
    function fetchRecipes() {
      fetch("feed_get_recipes.php")
        .then(response => response.json())
        .then(recipes => {
          cardsContainer.innerHTML = "";
  
          recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <h3>${recipe.name}</h3>
              <p><strong>Author:</strong> ${recipe.author}</p>
              <p><strong>Servings:</strong> ${recipe.servings}</p>
              <p><strong>Description:</strong> ${recipe.description}</p>
              <p><strong>Time:</strong> ${recipe.time}</p>
              <button class="toggleDetails">Show Recipe</button>
              <button class="saveBtn">Save to Recipes</button>
              <div class="recipeDetails" style="display: none;">
                <h4>Ingredients:</h4>
                <ul>${recipe.ingredients.split(", ").map(i => `<li>${i}</li>`).join("")}</ul>
                <h4>Steps:</h4>
                <ol>${recipe.steps.split(", ").map(s => `<li>${s}</li>`).join("")}</ol>
                <p><strong>Notes:</strong> ${recipe.notes}</p>
                
              </div>
            `;
  
            
            const toggleBtn = card.querySelector(".toggleDetails");
            const details = card.querySelector(".recipeDetails");
  
            toggleBtn.addEventListener("click", () => {
              const isVisible = details.style.display === "block";
              details.style.display = isVisible ? "none" : "block";
              toggleBtn.textContent = isVisible ? "Show Recipe" : "Hide Recipe";
            });
  
            
            const saveBtn = card.querySelector(".saveBtn");
            saveBtn.addEventListener("click", () => {


              fetch("save_to_recipe.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: recipe.id })
              })
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  alert("Recipe saved!");
                  saveBtn.disabled = true;
                  saveBtn.textContent = "Saved!";
                } else {
                  alert("Failed to save to recipes.");
                }
              })
              .catch(err => {
                console.error("Save to feed error:", err);
                alert("Error saving to recipes.");
              });
            });
  
            cardsContainer.appendChild(card);
          });
        })
        .catch(error => console.error("Error fetching recipes:", error));
    }
  
    fetchRecipes();
  });
  