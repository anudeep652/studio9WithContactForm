require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
     process.env.CLIENT_ID, // ClientID
     process.env.CLIENT_SECRET, // Client Secret
     "https://developers.google.com/oauthplayground" //Redirect URI
);

oauth2Client.setCredentials({
   
     refresh_token:  process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

// ya29.a0ARrdaM_unWJOvWvhbBjXrrdeKcHTgeBFU9iDJeNMy0Fa2hDGF_xVBKfkay32ixd5YEc0VvRj-0hxCl5RDgWgEOTHb_E_-sC-DPRb-_y4888Xd31Y_5Af9GfUkRtPqhTO73DwWY9RsBC_I6oG7YFCLIt_oCI2" access token new
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
     tls: {
  rejectUnauthorized: false
}
});



const mailOptions = {
     from: "websitecontactform9@gmail.com",
     to: "anudeepsvka@gmail.com,ronaldocr7deep@gmail.com",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>FROM NODEMAILER</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});