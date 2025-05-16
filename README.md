# PrepTastic
Title: Preptastic

Team Members: Jacklyn Greening, Sarah King, Maggie Johnson

Scope:  For the scope of our project we wanted three main pages: Recipe creation, Recipe Scheduling, and Grocery list creation. Those were the main three needs for our project.

Objectives: 
	Calendar: For the calendar page we wanted it to have three different views: monthly, weekly, and daily. The whole point was for it to allow a user to plan out and schedule their meals. We also wanted them not to be restricted in how far they could plan out, so we made sure that our calendar could hold data up to a year!
	Recipes/Feed: For the recipes page we wanted a couple of different components revolving around the creation and saving of recipes. On the Recipes page a user is able to create recipes, which will then automatically show up under the “Your Saved Recipes.” The recipes have two different views, one that is small and compact that shows the user a brief description and the time it takes to make the recipe. If they want to learn more then they can  click the “show recipe” button to see the second view which includes the ingredients, step-by-step, and any additional notes. The user is also able to post their recipe to the “feed,” which is kind of a blog-like page full of what's supposed to be other user’s recipes. Because we do not have a login system for this webpage, all of the “public” recipes are inserted into the database that we created. A user can also delete recipes from the Recipes as well, which deletes them from the database. Then for the feed page the user can also save any recipes they want and add them to their own saved recipes.
	Ingredients: For the ingredient page we wanted to keep it simple, it's a page where a user can fill out all of the ingredients they may need and check them off as they get them. The purpose of this page was mainly to help the user with organization and as a handy tool for them to utilize throughout their meal planning journey! 
	Help: The help page was created for a user who is new to the website, it has brief instructions on the main features of the website, and then  utilizing an image carousel we added images with more detailed instructions on how the website works. Beneath that we have FAQS, and then a contact area in case a user may still have some more questions that weren't answered. Because Preptastic is not an actual company the telephone, email, and instagram are all fake, and clicking on the instagram link will take a user to a “Fake Link” page thanking them for exploring and apologizing that it's fake. 

Motivations/Additions: Our goals for this project were completed: A meal planning website centered around simple/efficient organization. When we were creating the pages we really kept that in mind, especially around the recipe templates and the ingredients page. There were some additions outside of the scope we really wanted to add but did not have enough time to complete: ingredients and step-by-step lists being editable, having a grocery list on the calendar page that showed the un-checked items from the ingredients page,  a cute week view of the recipes planned, and adding a “prep-day” feature to the calendar. We believe that with another month we could definitely incorporate those features, however due to the dead line we were mainly focused on staying within the scope/main objectives for the website (Which we did accomplish and are proud of).

Step-by-step: Before anything can run for this website the user must have XMAP installed, and the Preptastic folder must be opened/located in the htdocs folder. 
Creating the database:
Our database is called preptastic
Db_server is localhost, the user is root, there is no password, db name is preptastic: 
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "preptastic";
$conn = "";
Once the database is created copy paste these tables in this order:
Recipes
ALTER TABLE recipes ADD COLUMN posted_to_feed INT DEFAULT 0;
Ingredients
Calendar_event_master
Day
recipe_ingredients
The database/website will work for this, however if you would like to have some premade recipes for the feed page just copy paste the recipe inserts located below the tables underneath the comment “recipes.” They should all have the posted_to_feed value of 1 so they will appear in the feed page, if you want to save them to the recipes page you can though. 
After all of this the database is all set and next you will need to install the library.
Library: 
Running the website: to run the website apache’s servers must be running—MySQL Database,  ProFTPD, Apache Web Server—and the database and library must be all set up. Then in your local browser type into the search bar “localhost/Preptastic/Calendar.html.” Note that if there are any other folders that the file is located in you may have to add their name to it (but if you simply just put the Preptastic folder in the htdocs folder it should be the exact same).
