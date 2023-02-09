const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

console.log(date);

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // Tells app to use ejs
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const toDoList = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", (req, res) => {
    day = date.getDate();
    res.render("list", {listTitle: day, toDoList: toDoList});
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work", toDoList: workItems});
})

app.post("./work", (req, res) => {
    let item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
})

app.post("/", (req, res) => {

    const item = req.body.item;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        toDoList.push(item);
        res.redirect("/");
    }
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
