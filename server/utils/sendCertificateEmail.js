import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // Load environment variables

// Create the transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Function to generate a certificate PDF dynamically
const generateCertificate = async (recipientName) => {
    const pdfPath = `./certificates/${recipientName}_Certificate.pdf`;
    const doc = new PDFDocument();

    // Create output directory if it doesn't exist
    if (!fs.existsSync("./certificates")) {
        fs.mkdirSync("./certificates");
    }

    return new Promise((resolve, reject) => {
        try {
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);

            // Add certificate content
            doc
                .fontSize(20)
                .text("Certificate of Completion", { align: "center", underline: true })
                .moveDown(2)
                .fontSize(16)
                .text(`This is to certify that`, { align: "center" })
                .moveDown(1)
                .fontSize(20)
                .text(`${recipientName}`, { align: "center", bold: true })
                .moveDown(1)
                .fontSize(16)
                .text("has successfully completed the course.", { align: "center" })
                .moveDown(2)
                .fontSize(14)
                .text("Course Team", { align: "center" })
                .moveDown(3);

            doc.end();

            writeStream.on("finish", () => resolve(pdfPath));
            writeStream.on("error", (err) => reject(err));
        } catch (error) {
            reject(error);
        }
    });
};

// Function to send a certificate email
const sendCertificateEmail = async (recipientEmail, recipientName) => {
    try {
        // Generate the certificate
        const certificatePath = await generateCertificate(recipientName);

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: recipientEmail,
            subject: "Congratulations! Here's Your Course Certificate",
            html: `
                <p>Dear ${recipientName},</p>
                <p>Congratulations on successfully completing the course!</p>
                <p>Attached is your course certificate. Keep up the great work!</p>
                <p>Best regards,<br>Your Course Team</p>
            `,
            attachments: [
                {
                    filename: `${recipientName}_Certificate.pdf`,
                    path: certificatePath,
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Certificate email sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error generating or sending email:", error);
    }
};

export default sendCertificateEmail;
