const express = require("express");
const app = express();
const port = 3000

app.get("/", (req, res) => {
    console.log(req);
    res.send("<h1><em>Hello World!</em></h1>");
})

app.get("/contact", (req, res) => {
    res.send("Contact me at: email@gmail.com");
})

app.get("/about", (req, res) => {
    res.send("This is info about me");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})