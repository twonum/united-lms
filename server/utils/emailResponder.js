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

// Function to send "Aid Application Approved" email
const sendAidApprovalEmail = (recipientEmail, recipientName) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: recipientEmail,
        subject: "Aid Application Approved",
        text: `Dear ${recipientName},\n\nCongratulations! Your application for financial aid has been approved. Our team is delighted to support you in your journey. Please check your account for further details.\n\nIf you have any questions or require additional assistance, feel free to reach out.\n\nBest regards,\nYour Support Team`,
        html: `<p>Dear ${recipientName},</p>
        <p>Congratulations! Your application for financial aid has been approved. Our team is delighted to support you in your journey. Please check your account for further details.</p>
        <p>If you have any questions or require additional assistance, feel free to reach out.</p>
        <p>Best regards,</p>
        <p>Your Support Team</p>`,
        alternatives: [
            {
                contentType: "text/x-web-markdown",
                content: `Dear ${recipientName},\n\nCongratulations! Your application for financial aid has been approved. Our team is excited to assist you in achieving your goals.\n\nBest regards,\nYour Support Team`,
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
sendAidApprovalEmail("applicant@example.com", "Applicant Name");
