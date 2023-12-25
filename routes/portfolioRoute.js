const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

// Create a nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  })
);

// Email sending route
router.post('/sendEmail', async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // Send email
    await transporter.sendMail({
      to: 'chouhanpriyam137@gmail.com',
      from: 'chouhanpriyam137@gmail.com', // Replace with your email address
      subject: 'From Portfolio Website',
      html: `
        <h2>Detail Information</h2>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: 'Thanks for Contacting me!!  Will get back to you soon',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error sending email',
      error,
    });
  }
});

module.exports = router;
