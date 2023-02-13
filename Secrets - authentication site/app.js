require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require("express-session"); 
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); // Passport-local is just a dependency for passport-local-mongoose
GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.COOKIES_SECRET_KEY,
    resave: false,
    saveUninitialized: false
})); // Config the session

app.use(passport.initialize()); // Tell app to use and initialise passport
app.use(passport.session()); // Tell passport deal with sessions

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/secretsDB", { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose); // This is how we add in the Mongoose passport
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy()); // Strategy is to authenticate using username and password
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//,userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/auth/google", (req, res) => {
    passport.authenticate("google", {scope: ["profile"]})
});

app.get("/auth/google/callback", (req, res) => {
    passport.authenticate("google", { failureRedirect: "/login"}),
    (req, res) => {
        res.redirect("/");
    }
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

        req.login(user, (err) => { // This is from the passport package
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => { // uses passport
                    res.redirect("/secrets");
                });
            }
        })

    });


app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) { // relying on passport again
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
        // Method "register" is from passport-local-mongoose
        User.register({username: req.body.username}, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, ()=> {
                    // call back triggered only if callback is successful
                    res.redirect("/secrets");
                });
            }
        })

    });

app.get("/logout", (req, res) => {
    req.logout((err) => { // uses passport
        if (err) {
            res.end(err);
        }
    });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server listening on http://localhost:" + 3000);
});