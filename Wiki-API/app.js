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

// REQUEST TARGETTING ALL ARTICLES //

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (!err) {
                res.json(foundArticles);
            } else {
                res.send(err);
            }
        })
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Successfully deleted all articles.");
            } else {
                res.send(err);
            }
        })
    })

// REQUEST TARGETTING ALL ARTICLES //

app.route("/articles/:article")
    .get((req, res) => {
        const article = req.params.article;
        Article.findOne({title: article}, (err, foundArtile) => {
            if (!err) {
                res.send(foundArtile);
            } else {
                res.send(err);
            }
        })
    })
    .put((req, res) => {
        console.log('Put route was hit');
        console.log(req.body.title);
        Article.replaceOne(
            {title: req.params.article}, // Params of req to point to correct article
            {$set: req.body}, // Body of req to provide correct content. As it is replaceOne, will remove any empty fields
            (err) => {
                if (!err) {
                    res.send("Successfully updated entire article");
                } else {
                    res.send(err);
                }
            }
        )
    })
    .patch((req, res) => {
        Article.updateOne(
            {title: req.params.article}, // Params of req to point to correct article
            // {title: req.body.title, content: req.body.content}, // Body of req to provide correct content. As it is replaceOne, will remove any empty fields
            {$set: req.body},
            (err) => {
                if (!err) {
                    res.send("Successfully updated article");
                } else {
                    res.send(err);
                }
            }
        )
    })
    .delete((req, res) => {
        Article.deleteOne(
            {title: req.params.article}, 
            (err) => {
                if (!err) {
                    res.send(`Successfully deleted ${req.params.article}`);
                } else {
                    res.send(err);
                }
            }
        )
    });

app.listen(port, () => {
    console.log("Listening on port http://localhost:" + port)
})