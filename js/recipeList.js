const recipeNames =
 [
   {
   name: "The Perfect Grilled Cheese",
    link: fetchRecipies("The Perfect Grilled Cheese"),
   }, 
   {
      name: "The Best Chocolate Chip Cookie Recipe Ever",
      link: null,
    },

    {
      name: "Greek Quesadillas",
      link: "../recipePull.php name=Greek Quesadillas",
   },

   {
      name: "Burrito Bowls",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Creamy Brocolli Pasta",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Quinoa Salad",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Pizza Burgers",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Overnight Oats",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Mediterranean Sheet Pan Vegetabes",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Mushroom Pasta",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },

   {
      name: "Egg Quiche",
      link: "https://www.foodnetwork.com/recipes/food-network-kitchen/the-best-chocolate-chip-cookie-recipe-ever-3362950",
   },
];


async function fetchRecipies(recipeName) 
{
   try {
      const response = await fetch(`../recipePull.php?name=${encodeURIComponent(recipeName)}`);
      if (response.ok) {
         const link = await response.text();
         if (link) {
            window.open(link, '_blank');
         } else {
            console.error("Recipe not found.");
         }
      } else {
         console.error("Failed to fetch the recipe.");
      }
   } catch (error) {
      console.error("An error occurred while fetching the recipe:", error);
   }
}