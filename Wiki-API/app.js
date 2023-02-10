const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const dbName = "wikiDB";

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/" + dbName, {useNewUrlParser: true})

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const Article = mongoose.model("Article", articleSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log("Listening on port http://localhost:" + port)
})