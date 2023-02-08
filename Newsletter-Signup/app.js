const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const https = require("https");
const { response } = require("express");

const app = express();
const PORT = process.env.PORT;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_DC = process.env.MAILCHIMP_DC;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log(__dirname + "/signup.html")
    res.sendFile(__dirname + "/signup.html")
});

app.get("/ping", (req, res) => {
    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}`;
    const options = {
        auth: `anyone1:${MAILCHIMP_API_KEY}`,
        method: "GET"
    }
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        })
    })
    request.end();
})

app.post("/", (req, res) => {
    const {firstName, lastName, email} = req.body;
    const data = {
        list_id: MAILCHIMP_AUDIENCE_ID,
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonPayload = JSON.stringify(data);
    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}`;
    const options = {
        auth: `anyone1:${MAILCHIMP_API_KEY}`,
        method: "POST"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            res.send("SENT!");
        })
    })

    request.write(jsonPayload);
    request.end();
})

app.listen(PORT, () => {
    console.log(`Currently listening on http://localhost:${PORT}`);
})