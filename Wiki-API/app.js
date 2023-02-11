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

app.get("/articles", (req, res) => {
    Article.find({}, (err, foundArticles) => {
        if (!err) {
            res.json(foundArticles);
        } else {
            res.send(err);
        }
    })
});

app.post("/articles", (req, res) => {
    const title = req.body.title;
    const content = req.body.content
    const newArticle = new Article({
        title: title,
        content: content
    })

    newArticle.save((err) => {
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });
})

app.delete("/articles", (req, res) => {
    Article.deleteMany({}, (err) => {
        if (!err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    })
})

app.listen(port, () => {
    console.log("Listening on port http://localhost:" + port)
})