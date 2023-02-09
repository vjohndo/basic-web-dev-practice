const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // Tells app to use ejs
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    const today = new Date();

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var currentDayIndex = today.getDay();
    var day = weekday[currentDayIndex];
    
    res.render("list", {day: day});
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
