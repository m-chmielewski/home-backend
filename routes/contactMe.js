const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("", (req, res, next) => {
 let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT == 465 ? true : false,
  auth: {
   user: process.env.MAIL_USER,
   pass: process.env.MAIL_PASS,
  },
 });

 transporter
  .sendMail({
   from: process.env.MAIL_USER,
   to: "m@mchm.pl",
   subject: req.body.subject,
   text: `From: ${req.body.from}\n\n${req.body.messageBody}`,
  })
  .then(() => res.json())
  .catch(error => next(error));
});

module.exports = router;
