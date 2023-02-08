const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// This parses reqs to see the form data, extended allows you post nested objects
app.use(bodyParser.urlencoded({extended: true})); 

const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    console.log(req.body);
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);

    res.send("Thanks. Result is " + (num1 + num2));
})

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const bmi = weight / (height * height);
    res.send(`Your BMI is ${bmi}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`localhost:${port}`);
})