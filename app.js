var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

// set up view engine
app.set("view engine", "ejs");

//static file
app.use(express.static("./public"));

//fire controller
todoController(app);

//listen to port
app.listen(3002);
console.log("Server is running on port 3002");