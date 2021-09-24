const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// const request= require("request")
// const https= require("https")
// const { post } = require("request")

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
});

mailchimp.setConfig({
    apiKey: "6d15eaa8f16298e4bbb13287e3b2b29a-us5",
    server: "us5",
});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.post("/", function (req, res) {
    const pehlaNaam = req.body.fname;
    const doosraNaam = req.body.lname;
    const mailKyahai = req.body.email;

    const subscribingUser = {
        firstName: pehlaNaam,
        lastName: doosraNaam,
        email: mailKyahai,
    };

    async function run() {
        const response = await mailchimp.lists.addListMember("2c244c9294", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            },
        });

        res.sendFile(__dirname+"/success.html")
    }







    run().catch(function(err){
        if (err){
            res.sendFile(__dirname+"/failure.html")
        }
    })
});

app.listen(process.env.PORT || 3000, function () {
    console.log("port 3500 is running and up");
});

// apiKey
// 6d15eaa8f16298e4bbb13287e3b2b29a-us5

// listID
// 2c244c9294


