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

ALTER TABLE recipes ADD posted_to_feed BOOLEAN DEFAULT 0;

CREATE TABLE day (
    date DATE,
    breakfast INT,
    lunch INT,
    dinner INT,
    is_meal_prep BOOLEAN,
    PRIMARY KEY (date),
    FOREIGN KEY (breakfast) REFERENCES recipe(ID),
    FOREIGN KEY (lunch) REFERENCES recipe(ID),
    FOREIGN KEY (dinner) REFERENCES recipe(ID)
);

CREATE TABLE ingredient (
    ID int AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    have_ingredient BOOLEAN,
    amount VARCHAR(50),
    PRIMARY KEY (ID)
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


/*HOLDS SCHEDULED MEAL PLANS*/
CREATE TABLE `calendar_event_master` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `event_start_date` date DEFAULT NULL,
  `event_end_date` date DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;