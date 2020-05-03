const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// tell the app to use the npm module "body-parser" in "url Encoded" mode
app.use(bodyParser.urlencoded({extended: true}));

// tell the app to use the "public" folder to send 
// all the "static" files to the browser
app.use(express.static("public"));

// tell the app to use the npm module "ejs" for templates
app.set('view engine','ejs');

var listOfItems = ["Buy Grocery", "Wash Vegetables", "Cook Food"];
var workItems = [];

app.get("/", function (req, res) {
    
    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newItem: listOfItems
    });

});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", 
                        newItem: workItems});
});

app.post("/", function(req, res) {
    
    let item = req.body.newItem;

    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        listOfItems.push(item);
        res.redirect("/");
    };

});

app.listen(3000, function(req, res) {
    console.log("Server listening at port 3000....");
});

/*
app.post("/work", function(req,res) {
    let item = req.body.newItem;
    workItems.push(item);

    res.redirect("/work");
});
*/