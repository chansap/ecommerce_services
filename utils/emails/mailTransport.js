const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({
  path: "./data/config.env",
});

// Nodemailer

const transporter = nodemailer.createTransport({
  // host: "smtp.forwardemail.net",                  // smtp.ethereal.net
  // port: 465,
  // secure: true,
  service: "gmail",
  auth: {
    user: process.env.MAIL_SECRT_USRNME,
    pass: process.env.MAIL_SECRT_PASS,
  },
});

module.exports = transporter;
