var bodyParser = require('body-parser');
var urlendcodeParser = bodyParser.urlencoded( {extended: false} );

// connect database
var db = require("mongoose");
db.connect('mongodb://localhost/todoapp');
db.connection.once('open', function(){
    console.log("Connection is successfully");
}).on("error", function(error) {
    console.log("Connection is failed", error);
});
// create schema
var todoSchema = new db.Schema({
    item : String,
});
var todo = db.model("todo", todoSchema);

module.exports = function (app) {
    // show to do
    app.get("/todo", function (req, res) {
        // get data from mongodb and pass it to view
        todo.find({}, function(err, data){
           if (err) throw err;
           res.render("todo", {todos: data});
        });
    });
    // fill to do
    app.post("/todo", urlendcodeParser, function (req, res) {
        var newTodo = todo(req.body).save(function (err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
    // remove to do
    app.delete("/todo/:item", function (req, res) {
        // delete to do from mongodb
        todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
};