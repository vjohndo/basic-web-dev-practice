require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require("express-session"); 
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); // Passport-local is just a dependency for passport-local-mongoose
GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate"); // Package to handle passport's findorcreate pseudo code

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.COOKIES_SECRET_KEY,
    resave: false,
    saveUninitialized: false
})); // Config the session

app.use(passport.initialize()); // Middleware: Tell app to use and initialise passport
app.use(passport.session()); // Middleware: Tell passport deal with persistent sessions

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/secretsDB", { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    provider: String,
    email: String
});
userSchema.plugin(passportLocalMongoose, {usernameField: "username"}); // This is how we add in the Mongoose passport
userSchema.plugin(findOrCreate); // Package to handle passport's findorcreate pseudo code

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy()); // Strategy is the method to authenticate. We must configure passport.

// Copied from passport js docs:
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

//As google plus is sunsetting: ,userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) { // Google sends back access token
        User.findOrCreate(
            { googleId: profile.id },
            { provider: "google", email: profile._json.email },
            function (err, user) { // findOrCreate is actually pseudo code
                console.log(profile);
                return cb(err, user);
            }
        );
    }
));

app.get("/", (req, res) => {
    res.render("home");
});

// Fixed hanging login. Make sure to use the documentation.
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get("/auth/google/secrets", 
    passport.authenticate('google', { failureRedirect: '/login' }), // Authenticaed on googles end, now authenticate locally
    (req, res) => {
      // Successful authentication, redirect home.
        res.redirect('/secrets');
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

        req.login(user, (err) => { // This is from the passport package. Req provided for authetication
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => { // uses passport to autheticate
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

app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
})

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        // Method "register" is from passport-local-mongoose

        const username = req.body.username;
        const password = req.body.password;

        User.register({username: username, email: username, provider: 'local'}, password, (err, user) => {
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