const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb://127.0.0.1:27017/secretsDB", {useNewUrlParser: true})

const secret = process.env.MONGOOSE_CONNECT_SECRET_KEY;

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post((req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({email: username}, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else if (foundUser && foundUser.password === password) {
                res.render("secrets");
            }
        })
    });

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        const email = req.body.username;
        const password = req.body.password;

        const newUser = new User({
            email: email,
            password: password
        });

        newUser.save((err) => {
            if (!err) {
                res.render("secrets");
            } else {
                console.log(err);
            }
        })
    });


app.listen(3000, () => {
    console.log("Server listening on http://localhost:" + 3000);
});