# Home Expenses Manager v1
This project is a household expense control system. It allows you to add people to your family, as well as transactions such as "expenses" and "income". In addition, you can check the total total expenses and income for the household and for each registered person. However, to access the system, you need to create an account and login.
 
## Features
In this system, you can:
- Add and delete a person from your family;
- Add and delete a transaction;
- See the total expenses and income;

It was intended to be a simple and small project, so everything will be found on just one page (home page). I might expand it later.

## Start the Application
The system was developed using React, Bootstrap and .Net/C#.
### Backend
To start the backend, you will need to navigate to the ExpensesControlAPI.
  ``` bash
cd backend/ExpensesControlAPI
````

Then, you will need to run the server.
  ``` bash
dotnet run --urls="http://localhost:5001"
````

Make sure you have the .NET framework installed in your computer.

### Frontend
To start the frontend, you will need to navigate to the home-expenses-frontend.
  ``` bash
cd home-expenses-frontend
````

Then, you will need to start the application.
  ``` bash
npm run start
````

Make sure you have all dependencies in "package.json" installed.

