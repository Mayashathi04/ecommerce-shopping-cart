const nodemailer = require('nodemailer');

/**
 * 📧 Sends a real email to the user's inbox containing the OTP code
 */
const sendEmailOTP = async (targetEmail, otpCode, username) => {
    // Setting up the automated mailing connection
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Structuring the actual email letter template
    const mailOptions = {
        from: `"MAYA's Shopping Cart" <${process.env.EMAIL_USER}>`,
        to: targetEmail,
        subject: '🔒 Your One-Time Security Passcode (OTP)',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2c3e50; text-align: center;">🛒 MAYA's shopping cart</h2>
                <p>Hello <strong>${username}</strong>,</p>
                <p>To finalize your login and enter the store, please use the following 4-digit security code:</p>
                <div style="font-size: 24px; font-weight: bold; text-align: center; color: #27ae60; padding: 15px; background: #f4f6f8; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">
                    ${otpCode}
                </div>
                <p style="font-size: 12px; color: #777;">This verification code is valid for 5 minutes. If you did not request this, please ignore this message.</p>
            </div>
        `,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailOTP };