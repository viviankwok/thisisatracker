# thisisatracker

## Description

Thisisatracker is a calorie tracker app, meant to check the sum of the calories of selected recipes. Recipes are stored in a database and user can filter the preferred recipes according to the meat/vege/tags. The intention is for the users to track the calorie intakes for their meal and be aware of the surplus or deficit in calorie count for their meal plan.

## Dependencies used

Backend

- Npm I express cors bcrypt dotenv express jsonwebtoken mongoose nodemon uuid express-validator

Frontend

- Npm I react-router-dom

## General Approach

The app is divided into 2 major components each for the front end and back end.

Backend

- JWT authentication for users (user router)
- Recipe database (recipe router)

Frontend

- User login
- Recipe selection

The database backend is handled first, creating the user Schema and recipe Schema. Following the design of the backend, the routes are created and tested upon with the frontend. Any additional features are experimented and implemented along the way (such as filtering of recipe in the front end and sending the filtered data to the backend). In essence, the planning of the backend contributed largely to the development of the frontend (users requirement, recipe requirement).

## User stories

1. Database that stores a list of recipes for users to filter based on fixed fields.
2. Calorie tracker computes the total amount of calories based on the user's selected recipes.
3. User receives information on calories surplus or deficit with the recipe meal plan they have selected.

## Wireframe

## Unsolved problems
