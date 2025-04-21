const recipeNames =
 [
   {
   name: "The Perfect Grilled Cheese",
    link: fetchRecipies("The Perfect Grilled Cheese"),
   }, 
   {
      name: "The Best Chocolate Chip Cookie Recipe Ever",
      link: "../recipePull.php? name=The Best Chocolate Chip Cookie Recipe Ever",
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


async function fetchRecipies(recipeName) {
 try {
   const response = await fetch('../../recipePull.php', recipeName);
   if (!response.ok) 
      {
      throw new Error('Failed to fetch recipes');
   }
   const recipe = await response.json();
   return recipeLink;
 }  
 catch (error) {
   console.error('Error fetching recipes:', error);
   return null;
 }
}