-- I put all of the tables below into a database named preptastic, PHP code will reference that database
-- I put NOT NULL constraints on certain variables depending on whether 
-- I thought they were absolutely necessary or not

-- main 3 tables that correspond to the main 3 features
-- I changed the recipe to recipes while working on it
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  description TEXT,
  servings INT,
  time VARCHAR(50),
  ingredients TEXT,
  notes TEXT,
  steps TEXT,
  link VARCHAR(500)
);

ALTER TABLE recipes ADD COLUMN posted_to_feed INT DEFAULT 0;

CREATE TABLE ingredient (
    ID int AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    have_ingredient BOOLEAN DEFAULT 0,
    amount VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

/*HOLDS SCHEDULED MEAL PLANS*/
CREATE TABLE `calendar_event_master` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `event_start_date` date DEFAULT NULL,
  `event_end_date` date DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE day (
    date DATE,
    breakfast INT,
    lunch INT,
    dinner INT,
    is_meal_prep BOOLEAN,
    PRIMARY KEY (date),
    FOREIGN KEY (breakfast) REFERENCES recipes(ID),
    FOREIGN KEY (lunch) REFERENCES recipes(ID),
    FOREIGN KEY (dinner) REFERENCES recipes(ID)
);



-- intersection table
CREATE TABLE recipe_ingredients (
    ID INT AUTO_INCREMENT,
    recipe_ID INT,
    ingredient_ID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (recipe_ID) REFERENCES recipe(ID),
    FOREIGN KEY (ingredient_ID) REFERENCES ingredient(ID) 
);


/*recipes*/
-- Recipes with posted_to_feed = 1
INSERT INTO recipes (name, author, description, servings, time, ingredients, steps, notes, link, posted_to_feed) VALUES
("Grandma’s Classic Meatloaf", "Helen B.", "A hearty, nostalgic meatloaf just like grandma used to make.", 6, "1h 20m", "Ground beef, Onion, Garlic, Breadcrumbs, Eggs, Ketchup, Worcestershire sauce, Salt, Pepper", "Preheat oven to 375°F, Mix all ingredients, Shape into a loaf, Bake for 1 hour, Let rest before slicing", "Serve with mashed potatoes for the full effect.", "http://localhost/preptastic/COPY.html", 1),

("Spicy Thai Peanut Noodles", "Chef Lee", "Quick, spicy noodles with a creamy peanut sauce.", 2, "0h 25m", "Rice noodles, Peanut butter, Soy sauce, Lime juice, Sriracha, Garlic, Green onions, Peanuts", "Cook noodles, Whisk sauce ingredients, Toss noodles with sauce, Garnish with onions and peanuts", "Adjust sriracha for desired heat.", "http://localhost/preptastic/COPY.html", 1),

("Sheet Pan Lemon Herb Chicken", "Rachel G.", "One-pan chicken dinner infused with fresh herbs and lemon.", 4, "0h 45m", "Chicken thighs, Lemon, Rosemary, Thyme, Potatoes, Carrots, Olive oil, Salt, Pepper", "Preheat oven to 400°F, Chop vegetables, Toss everything in oil and herbs, Roast for 35–40 mins", "Great for meal prep!", "http://localhost/preptastic/COPY.html", 1),

("Cheesy Baked Ziti", "Marco V.", "Comfort food at its finest with gooey cheese and zesty sauce.", 6, "1h 10m", "Ziti pasta, Marinara sauce, Ricotta, Mozzarella, Parmesan, Garlic, Basil", "Boil pasta, Mix with sauce and cheese, Layer in dish, Bake until bubbly", "Let sit for 10 mins after baking.", "http://localhost/preptastic/COPY.html", 1),

("Vegan Chickpea Curry", "Tasha M.", "A creamy, flavorful curry that’s 100% plant-based.", 4, "0h 40m", "Chickpeas, Coconut milk, Onion, Garlic, Ginger, Curry powder, Spinach, Tomatoes", "Sauté aromatics, Add spices and tomatoes, Stir in chickpeas and coconut milk, Simmer, Add spinach last", "Delicious with rice or naan.", "http://localhost/preptastic/COPY.html", 1),

("Fluffy Banana Pancakes", "Jordan B.", "Perfect weekend brunch pancakes made with ripe bananas.", 3, "0h 30m", "Bananas, Flour, Eggs, Baking powder, Milk, Cinnamon, Salt", "Mash bananas, Mix wet and dry ingredients separately, Combine and cook on skillet", "Add chocolate chips for a treat!", "http://localhost/preptastic/COPY.html", 1),

("BBQ Pulled Jackfruit Sliders", "Nina R.", "Tastes just like pulled pork—but totally vegan.", 4, "0h 50m", "Canned jackfruit, BBQ sauce, Onion, Garlic, Slider buns, Slaw mix", "Drain and shred jackfruit, Sauté with onion/garlic, Add BBQ sauce and simmer, Serve on buns with slaw", "Great party food!", "http://localhost/preptastic/COPY.html", 1),

("Garlic Butter Shrimp Scampi", "Omar C.", "Fast, fancy dinner with shrimp, pasta, and lots of garlic.", 2, "0h 25m", "Shrimp, Spaghetti, Garlic, Butter, Lemon juice, Parsley, Chili flakes", "Cook pasta, Sauté garlic in butter, Add shrimp, Toss with pasta and lemon juice", "Use fresh lemon for best flavor.", "http://localhost/preptastic/COPY.html", 1),

("Butternut Squash Soup", "Eliza S.", "Creamy and comforting autumn soup made with roasted squash.", 5, "1h 15m", "Butternut squash, Onion, Garlic, Vegetable broth, Cream, Nutmeg, Olive oil", "Roast squash, Sauté onions/garlic, Blend with broth, Simmer, Stir in cream", "Top with roasted seeds or croutons.", "http://localhost/preptastic/COPY.html", 1),

("Easy Chicken Quesadillas", "Tony F.", "Quick, cheesy, and kid-friendly quesadillas with a crispy crust.", 4, "0h 30m", "Tortillas, Cooked chicken, Cheese, Salsa, Onions, Bell peppers", "Heat tortilla, Add fillings, Fold and cook until golden, Slice and serve", "Try with sour cream or guac!", "http://localhost/preptastic/COPY.html", 1);



-- dummy values for the tables to test PHP and HTML code
INSERT INTO recipe (name, author, servings, time, ingredients, link, notes, rating)
VALUES ("The Perfect Grilled Cheese", "Food Network", 1, "00:20:00", "Two slices of bread, 
two slices of your favorite cheese, some butter", 
"https://www.foodnetwork.com/recipes/food-network-kitchen/the-perfect-grilled-cheese-3636831", "Great recipe! Could add more cheese", 4);
INSERT INTO recipe (name, author, servings, time, ingredients, link, notes, rating) 
VALUES ("The Best Chocolate Chip Cookie Recipe Ever", "JoyFoodSunshine", 36, "00:30:00", 
"1 cup salted butter, 1 cup granulated sugar, 1 cup light brown sugar, 2 teaspoons pure vanilla extract, 2 large eggs, 
3 cups all-purpose flour, 1 teaspoon baking soda, 1/2 teaspoon baking powder, 1 teaspoon sea salt, 2 cups chocolate chips (12 oz)",
"https://joyfoodsunshine.com/wprm_print/the-best-chocolate-chip-cookie-recipe-ever", "Add more chocolate chips", 5);

INSERT INTO ingredient (name, description, have_ingredient, list_ID, price, amount) 
VALUES ("Salted butter", "Typically buy at Walmart, amount is in sticks", TRUE, 1, 5.00, 4);
INSERT INTO ingredient (name, description, have_ingredient, list_ID, price, amount)
VALUES ("Sliced Cheddar Cheese", "Typically buy at Target, favorite is Sargento", FALSE, 1, 4.00, 0);
INSERT INTO ingredient (name, description, have_ingredient, list_ID, price, amount)
VALUES ("Pure Vanilla Extract", "Typically buy at Walmart", TRUE, 2, 15.00, 1);

INSERT INTO recipe_ingredients (recipe_ID, ingredient_ID) 
VALUES (1, 1);
INSERT INTO recipe_ingredients (recipe_ID, ingredient_ID)
VALUES (1, 2);
INSERT INTO recipe_ingredients (recipe_ID, ingredient_ID)
VALUES (2, 1);
INSERT INTO recipe_ingredients (recipe_ID, ingredient_ID)
VALUES (2, 3);

INSERT INTO day (date, breakfast, dinner, is_meal_prep)
VALUES ("2025-04-17", 2, 1, FALSE);
INSERT INTO day (date, lunch, dinner, is_meal_prep)
VALUES ("2025-04-02", 1, 2, TRUE);
INSERT INTO day (date, lunch, dinner, is_meal_prep)
VALUES ("2025-03-31", 2, 1, TRUE);


