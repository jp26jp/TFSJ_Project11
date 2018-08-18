## Download the project files. We've supplied the following files for you to use:
- The seed-data folder contains seed data for your database that can be used in conjunction with the mongoimport command line utility.
- The src folder is where you'll be building your Node.js REST API. We’ve provided some files to get you started.
    - The index.js file configures Express to serve a simple REST API. We've also configured the morgan npm package to log HTTP requests/responses to the console.
    - We’ve included a .gitignore file to ensure that the node_modules folder doesn't get pushed to your GitHub repo.
    - The CourseAPI.postman_collection.json file is a collection of Postman requests that you can use to test and explore your REST API.
    - The nodemon.js file configures the nodemon Node.js module, which we are using to run your REST API.
    - The package.json file is the project’s npm configuration, which includes the project’s dependencies.

## Ensure that you have MongoDB installed.
- Open a Command Prompt (on Windows) or Terminal (on Mac OS X) instance and run the command mongod (or sudo mongod) to start the MongoDB daemon.
- If that command failed then you’ll need to install MongoDB.
- How to Install MongoDB on Windows
- How to Install MongoDB on a Mac

## Seed your MongoDB database with data.
- If you haven't already done so, open a Command Prompt (on Windows) or Terminal (on Mac OS X) instance and run the command mongod (or sudo mongod) to start the MongoDB daemon.
- Open a second Command Prompt (on Windows) or Terminal (on Mac OS X) instance.
- Browse to the seed-data folder located in the root of the project.
- Run the following commands:

```
mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json
```

## We’ve provided you with a basic project to get started. When developing your REST API, just add your code to the src folder. You’ll need to run the provided Node.js Express application locally and use Postman to test your REST API.
- Open a Command Prompt (on Windows) or Terminal (on Mac OS X and Linux) instance and browse to the root project folder.
- Run the command npm install to install the required dependencies.
- Run the command npm start to run the Node.js Express application using nodemon. Using nodemon gives you the ability to leave your application running while you edit your application’s code (nodemon will restart your Node.js application when it detects that you’ve made changes to your code).
- As you build your routes, you can see what information it sends back with Postman using the preconfigured requests in the collections file included in the project.
- You can press Ctrl-C to stop the Node.js REST API.

## Postman is a great Chrome App that you will use to explore and test REST APIs. To help you jumpstart the exploration process, we’ve provided you with a collection of Postman requests as part of the project files. Here’s how to load the provided collection into Postman:
- If you haven’t already, install Postman. Links and instructions are available on their website at https://www.getpostman.com/.
- Once you have Postman installed and open, click on the “Import” button in the top left hand corner of the application’s window.
- In the opened dialog, click the “Choose Files” button and browse to the folder that contains your project files.
- Select the CourseAPI.postman_collection.json file.
- You should now see the Course API collection in the left hand pane of the main Postman window.
- Click on one of the available requests to load it into a tab. Click on the Request button to issue the request to the local server.
- Be sure that your REST API is currently running (see the previous project step for details).
- When testing for user authorization at GET /api/users, make sure to set Authorization Type in postman to Basic Auth to enter the user's email and password.


## As you build out your REST API, you’ll naturally encounter errors and unexpected behavior. Here are some reminders and suggestions on how to debug your REST API.
- If Node.js crashed as a result of the error, you can look in the Command Prompt (on Windows) or Terminal (on Mac OS X and Linux) window and see the exception information.
- Sometimes errors don’t result in exceptions, but instead are returned as 400 or 500 HTTP status codes. Errors returned from your REST API will be logged in Postman.
- For a deeper, more detailed analysis of the state of your application, you can use Google Chrome to debug your Node.js application. Watch the Debugging Node Applications With Google Chrome workshop for more information.
