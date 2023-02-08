const express = require("express");
const app = express();

const config = require("dotenv").config();
const PORT = process.env.PORT;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

app.get("/", (req, res) => {
    res.send("This is working");
})

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});