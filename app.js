require('dotenv').config()
const express = require("express");
const Insta = require("instamojo-nodejs");
const bodyParser = require("body-parser");

const API_KEY = process.env.Your_API_KEY;
const AUTH_KEY = process.env.YOUR_AUTH_KEY;

Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get('/Donate.ejs', (req, res) => {
      res.render('Donate.ejs');
      });
    
    app.get('/contactUs.ejs', (req, res) => {
        res.render('contactUs.ejs');
        });
    
    app.get('/aboutUs.ejs', (req, res) => {
          res.render('aboutUs.ejs');
          });
    
    app.get("/ || /index.js", (req, res) => {
            res.render("index.ejs");
          });


app.post('/pay', (req,res)=>{
var name = req.body.name;
var email = req.body.email;
var amount = req.body.amount;

console.log(name);
console.log(email);
console.log(amount);

var data = new Insta.PaymentData();
const REDIRECT_URL = "https://localhost:3000/success";

data.setRedirectUrl(REDIRECT_URL);
data.send_email = "True";
data.purpose = "Gracious Givers"; 
data.amount = amount;
data.name = name;
data.email = email; 

 Insta.createPayment(data, function (error, response) {
  if (error) {
  } else {
     res.send("Please check your email to make payment")
   }
 });
 });

 app.get('/success',(req,res)=>{
  res.send("Payment is successful please check your mail for invoice in pdf")
})

app.listen(PORT, () => {
 console.log(`App is listening on ${PORT}`);
});
