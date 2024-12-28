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

// Function to send an email
const sendMail = ({ to, subject, body }) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: body,
        html: `<p>${body}</p>`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                console.log("Email sent: " + info.response);
                resolve(info);
            }
        });
    });
};

module.exports = { sendMail };
