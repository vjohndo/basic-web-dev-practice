const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const config = require("dotenv").config();
const PORT = process.env.PORT;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    console.log("Post request received")
    const query = req.body.cityName;
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${OPEN_WEATHER_API_KEY}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            console.log(temp + " " + description);
            res.write(`<h1>It is looking like ${description}.</h1>`);
            res.write(`<p>The temperature in Sydney is ${temp}</p>`);
            res.write(`<img src=http://openweathermap.org/img/wn/${icon}@2x.png>`)
            res.send()
        })
    });
})

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});