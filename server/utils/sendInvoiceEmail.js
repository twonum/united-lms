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

// Function to generate an invoice PDF dynamically
const generateInvoice = async (recipientName, courseName, amountPaid) => {
    const pdfPath = `./invoices/${recipientName}_Invoice.pdf`;
    const doc = new PDFDocument();

    // Create output directory if it doesn't exist
    if (!fs.existsSync("./invoices")) {
        fs.mkdirSync("./invoices");
    }

    return new Promise((resolve, reject) => {
        try {
            const writeStream = fs.createWriteStream(pdfPath);
            doc.pipe(writeStream);

            // Add invoice content
            doc
                .fontSize(20)
                .text("Course Purchase Invoice", { align: "center", underline: true })
                .moveDown(2)
                .fontSize(16)
                .text(`Recipient: ${recipientName}`, { align: "left" })
                .moveDown(1)
                .text(`Course Name: ${courseName}`, { align: "left" })
                .moveDown(1)
                .text(`Amount Paid: $${amountPaid.toFixed(2)}`, { align: "left" })
                .moveDown(2)
                .fontSize(14)
                .text("Thank you for your purchase!", { align: "center" })
                .moveDown(3);

            doc.end();

            writeStream.on("finish", () => resolve(pdfPath));
            writeStream.on("error", (err) => reject(err));
        } catch (error) {
            reject(error);
        }
    });
};

// Function to send an invoice email
const sendInvoiceEmail = async (recipientEmail, recipientName, courseName, amountPaid) => {
    try {
        // Generate the invoice
        const invoicePath = await generateInvoice(recipientName, courseName, amountPaid);

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: recipientEmail,
            subject: "Thank You for Your Purchase - Invoice Attached",
            html: `
                <p>Dear ${recipientName},</p>
                <p>Thank you for purchasing the "${courseName}" course!</p>
                <p>Attached is your invoice for the purchase.</p>
                <p>Amount Paid: ${amountPaid.toFixed(2)} Pkr</p>
                <p>Best regards,<br>Your Course Team</p>
            `,
            attachments: [
                {
                    filename: `${recipientName}_Invoice.pdf`,
                    path: invoicePath,
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Invoice email sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error generating or sending email:", error);
    }
};

export default sendInvoiceEmail;
