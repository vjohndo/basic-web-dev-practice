require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Need to require the following:
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configure the application
app.use(session({
    secret: process.env.COOKIES_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

// Configure app to use passport
app.use(passport.initialize()); // Initialise passport
app.use(passport.session()); // Tell passport deal with sessions

mongoose.connect("mongodb://127.0.0.1:27017/secretsDB", { useNewUrlParser: true })

// Create the schema but include the passport package
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// Configure passport for serialising and deserialising cookies
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post((req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })

        // login is a passport thing.
        req.login(user, (err) => {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                })
            }
        })

    });

app.get("/secrets", (req, res) => {

    // checking cookies is a passport thing.
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/register");
    }
})

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {

        // registering is a passport thing
        User.register({username: req.body.username}, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, ()=> {
                    res.redirect("/secrets");
                })
            }
        })

    });

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            res.end(err);
        }
    });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server listening on http://localhost:" + 3000);
});