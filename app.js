require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const express = require("express");




const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));



//get requests 

app.get("/", (req, res) => {
     res.render("index");
})

app.get("/contact", (req, res) => {
     res.render("contact", {msg:""});
})


//post requests 
app.post("/submit-form", (req, res) => {


     const oauth2Client = new OAuth2(
          process.env.CLIENT_ID, // ClientID
          process.env.CLIENT_SECRET, // Client Secret
          "https://developers.google.com/oauthplayground" //Redirect URI
     );



     oauth2Client.setCredentials({
   
          refresh_token: process.env.REFRESH_TOKEN
     });
     const accessToken = oauth2Client.getAccessToken()

     const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
               type: "OAuth2",
               user: "websitecontactform9@gmail.com",
               clientId: process.env.CLIENT_ID,
               clientSecret: process.env.CLIENT_SECRET,
               refreshToken: process.env.REFRESH_TOKEN,
               accessToken: accessToken
          },
          // tls: {
          //      rejectUnauthorized: false
          // }
     });



     const mailOptions = {
          from: "websitecontactform9@gmail.com",
          to: "anudeepsvka@gmail.com,ronaldocr7deep@gmail.com",
          subject: "New message from Studio9 website!",
          generateTextFromHTML: true,
          html: `<p>You have a new contact request</p>
                    <h3>Contact Details</h3>
                    <ul>  
                         <li>Name: ${req.body.name}</li>
                         <li>Company: ${req.body.company}</li>
                         <li>Email: ${req.body.email}</li>
                         <li>Phone: ${req.body.phone}</li>
                    </ul>
                    <h3>Message</h3>
                    <p>${req.body.message}</p>  `
          
     };

     smtpTransport.sendMail(mailOptions, (error, response) => {
          if (error) {
               console.log(error);
              
               res.render("contact", {msg:"Sorry, we are unable to send your mail. Please try again :( "})
               
          } else {
               console.log(response);
               res.render("contact", {msg:"Mail sent successfully!"})

              

          }
          smtpTransport.close();
     });
     

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
     console.log("server started");
})