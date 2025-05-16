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


  addIngredientBtn.addEventListener("click", () => {
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientList.appendChild(li);
      ingredientInput.value = "";
    }
  });


  addStepBtn.addEventListener("click", () => {
    const step = stepInput.value.trim();
    if (step) {
      const li = document.createElement("li");
      li.textContent = step;
      stepList.appendChild(li);
      stepInput.value = "";
    }
  });

  //Stopping the enter issue lol
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
        e.preventDefault();
      }
    }
  });

  //Creating the recipe card
  form.addEventListener("submit", (e) => {
    e.preventDefault();


    const name = document.getElementById("recipeName").value.trim();
    const author = document.getElementById("author").value.trim();
    const servings = document.getElementById("servings").value;
    const description = document.getElementById("description").value.trim();
    const hours = document.getElementById("cookTimeHours").value.trim();
    const minutes = document.getElementById("cookTimeMinutes").value.trim();
    const time = `${hours}h ${minutes}m`;
    const notes = document.getElementById("notes").value.trim();


    const ingredients = Array.from(ingredientList.children).map(li => li.textContent);
    const steps = Array.from(stepList.children).map(li => li.textContent);


    const data = {
      name: name,
      author: author,
      description: description,
      servings: servings,
      time: time,
      ingredients: ingredients.join(", "),
      steps: steps.join(", "),
      link: "http://localhost/preptastic/COPY.html", // Adjust the link as needed
      notes: notes
    };

    fetch("submit_recipe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      
      .then(result => {
  const response = JSON.parse(result);
  if (response.success) {
    const newId = response.id;



    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3><strong>${name}</strong></h3>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Servings:</strong> ${servings}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Time:</strong> ${time}</p>
        
        <div class="recipeDetails" style="display: none;">
            <p><strong>Ingredients:</strong></p>
            <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <p><strong>Steps:</strong></p>
            <ol>${steps.map(s => `<li>${s}</li>`).join("")}</ol>
            <p><strong>Notes:</strong> ${notes}</p>

        
        </div>

        <button class="toggleDetails">Show Recipe</button>
        <button class="postBtn">Post to Feed</button>
        <button class="deleteBtn">Remove Recipe</button> 
    `;

    const toggleBtn = card.querySelector(".toggleDetails");
    const details = card.querySelector(".recipeDetails");

    toggleBtn.addEventListener("click", () => {
      const isVisible = details.style.display === "block";
      details.style.display = isVisible ? "none" : "block";
      toggleBtn.textContent = isVisible ? "Show Recipe" : "Hide Recipe";
    });

    // POST
    const postBtn = card.querySelector(".postBtn");
    postBtn.addEventListener("click", () => {
      fetch("post_to_feed.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Posted to feed!");
          postBtn.disabled = true;
          postBtn.textContent = "Posted!";
        } else if (data.status === "duplicate") {
          alert("Already posted.");
        } else {
          alert("Error posting recipe.");
        }
      });
    });

    // DELETE
    const deleteBtn = card.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this recipe?")) {
        fetch("delete_recipe.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newId })
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          card.remove();
        });
      }
    });

    cardsContainer.appendChild(card);
    form.reset();
    ingredientList.innerHTML = "";
    stepList.innerHTML = "";

    
  } else {
    alert("Failed to submit recipe.");
  }
});



    cardsContainer.appendChild(card);
    form.reset();
    ingredientList.innerHTML = "";
    stepList.innerHTML = "";

  });

  

  function fetchRecipes() {
    fetch("get_recipes.php")
      .then(response => response.json())
      .then(recipes => {
        cardsContainer.innerHTML = "";

        recipes.forEach(recipe => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3><strong>${recipe.name}</strong></h3>
            <p><strong>Author:</strong> ${recipe.author}</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Description:</strong> ${recipe.description}</p>
            <p><strong>Time:</strong> ${recipe.time}</p>
          
            <div class="recipeDetails" style="display: none;">
                <p><strong>Ingredients:</strong></p>
                <ul>${recipe.ingredients.split(", ").map(i => `<li>${i}</li>`).join("")}</ul>
                <p><strong>Steps:</strong></p>
                <ol>${recipe.steps.split(", ").map(s => `<li>${s}</li>`).join("")}</ol>
                <p><strong>Notes:</strong> ${recipe.notes}</p>

            </div>

            <button class="toggleDetails">Show Recipe</button>
            <button class="postBtn">Post to Feed</button>
                <button class="deleteBtn">Remove Recipe</button> 
          `;
          

          const toggleBtn = card.querySelector(".toggleDetails");
          const details = card.querySelector(".recipeDetails");

          toggleBtn.addEventListener("click", () => {
            const isVisible = details.style.display === "block";
            details.style.display = isVisible ? "none" : "block";
            toggleBtn.textContent = isVisible ? "Show Recipe" : "Hide Recipe";
          });

            const deleteBtn = card.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => {
              if (confirm("Are you sure you want to delete this recipe?")) {
                fetch("delete_recipe.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ id: recipe.id })
                })
                .then(response => response.text())
                .then(result => {
                  alert(result);
                  fetchRecipes();
                })
                .catch(error => {
                  console.error("Delete error:", error);
                  alert("Error deleting the recipe.");
                });
              }
            });

   
              const postBtn = card.querySelector(".postBtn");
              postBtn.addEventListener("click", () => {
                fetch("post_to_feed.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: recipe.id })
                })
                .then(res => res.json())
                .then(data => {
                  if (data.success) {
                    alert("Recipe posted to feed!");
                    postBtn.disabled = true;
                    postBtn.textContent = "Posted!";
                  } else if (data.status === "duplicate") {
                    alert("DUPLICATE: This recipe has already been posted to the feed.");
                  } else {
                    alert("Failed to post recipe.");
                  }
                })
                .catch(err => {
                  console.error("Post to feed error:", err);
                  alert("Error posting to feed.");
                });
              });
              
                
              
              
            

          cardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error("Error fetching recipes:", error));

  }
  fetchRecipes();
});
