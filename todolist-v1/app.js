const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // Tells app to use ejs
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const today = new Date();
    var currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0) {
        res.write("<h1>Hello World!</h1>");
        res.send();
    } else {
        res.sendFile(__dirname + "/index.html");
    }
    
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
