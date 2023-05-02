# bookstore

This is a simple app demonstrating React in Laravel and using Elasticsearch for a bookstore.

Setup:

After cloning the project...
- go to inside backend directory
- make a copy of .env.example file and save as .env
- open .env file and edit database credentials and add "SCOUT_DRIVER=database" (for elastic search)

In terminal
- go to backend directory by cd bookstore/backend
then run "composer install" and start the server by "php artisan serve"
- go to frontend directory by cd bookstore/frontend
then run "npm install" and start frontend "npm start"

Now check the application.

1. Home page will open like:
![image](https://user-images.githubusercontent.com/87356238/235745795-4a08cc04-a7fd-4fee-b687-dd0da1ad7746.png)

2. To create new book go to menu dropdown Admin->Create Book then follwing page will open to add new book:
![image](https://user-images.githubusercontent.com/87356238/235748210-3f27af3e-6fee-4a17-80c9-e270c9b5ebff.png)

3. To Check the list of books go to menu dropdown Admin->Book List then it will open list like:
![image](https://user-images.githubusercontent.com/87356238/235748692-2c94a2ff-0c2f-4620-a65f-e12d82063bc7.png)


