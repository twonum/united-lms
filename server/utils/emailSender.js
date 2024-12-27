/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const nodemailer = require("nodemailer");

// Ensure environment variables are set
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("GMAIL_USER and GMAIL_PASS must be set in the environment.");
    process.exit(1);
}

// Create the transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Function to send "Aid Application Received" email
const sendAidReceivedEmail = (recipientEmail, recipientName) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: recipientEmail,
        subject: "Aid Application Received",
        text: `Dear ${recipientName},\n\nWe have received your application for financial aid. Our team will review it and get back to you shortly.\n\nBest regards,\nYour Course Team`,
        html: `<p>Dear ${recipientName},</p>
        <p>We have received your application for financial aid. Our team will review it and get back to you shortly.</p>
        <p>Best regards,</p>
        <p>Your Course Team</p>`,
        alternatives: [
            {
                contentType: "text/x-web-markdown",
                content: `Dear ${recipientName},\n\nCongratulations! Your application for financial aid has been received. Our team will review it and respond shortly.\n\nBest regards,\nYour Support Team`,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

// Example usage
sendAidReceivedEmail("applicant@example.com", "Applicant Name");
