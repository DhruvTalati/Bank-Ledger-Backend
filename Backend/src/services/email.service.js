require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Bank Ledger – Account Successfully Created";

  const text = `Hello ${name},

Welcome to Bank Ledger!

Your account has been successfully created and is now ready to use.

With Bank Ledger, you can:
• Manage your account securely
• Track transactions and balances
• Monitor your financial activities
• Access your banking records anytime

Security Reminder:
• Never share your password or OTP with anyone.
• Use a strong and unique password.
• Contact support immediately if you notice any suspicious activity.

If you did not create this account, please contact our support team immediately.

Thank you for choosing Bank Ledger.

Best Regards,
Bank Ledger Team
Secure Banking • Smart Financial Management`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
      
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #16a34a;">🏦 Bank Ledger</h1>
      </div>

      <h2 style="color: #111827;">Welcome, ${name}!</h2>

      <p>
        Your account has been successfully created and is now ready to use.
      </p>

      <p>
        We are excited to have you as a part of the Bank Ledger community.
      </p>

      <h3>What you can do now:</h3>

      <ul>
        <li>Manage your account securely</li>
        <li>Track transactions and balances</li>
        <li>Monitor financial activities</li>
        <li>Access records anytime</li>
      </ul>

      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <strong>🔒 Security Reminder</strong>
        <ul>
          <li>Never share your password or OTP.</li>
          <li>Use a strong and unique password.</li>
          <li>Report suspicious activity immediately.</li>
        </ul>
      </div>

      <p>
        If you did not create this account, please contact our support team immediately.
      </p>

      <p>
        Thank you for choosing <strong>Bank Ledger</strong>.
      </p>

      <br>

      <p>
        Best Regards,<br>
        <strong>Bank Ledger Team</strong>
      </p>

      <hr>

      <p style="font-size: 12px; color: #6b7280; text-align: center;">
        Secure Banking • Smart Financial Management
      </p>

    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(
  userEmail,
  name,
  amount,
  type,
  transactionId,
  balance,
) {
  const subject = `${type} Transaction Successful - Bank Ledger`;

  const text = `Hello ${name},

We would like to inform you that your transaction has been processed successfully.

Transaction Details:
- Transaction ID: ${transactionId}
- Transaction Type: ${type}
- Amount: ₹${amount}
- Available Balance: ₹${balance}

If you did not authorize this transaction, please contact our support team immediately.

Thank you for banking with Bank Ledger.

Best Regards,
Bank Ledger Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px;">
      <h2 style="color:#16a34a;">✅ Transaction Successful</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Your transaction has been successfully processed.</p>

      <div style="background:#f3f4f6; padding:15px; border-radius:8px;">
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Transaction Type:</strong> ${type}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Available Balance:</strong> ₹${balance}</p>
      </div>

      <p>
        If you did not authorize this transaction, please contact our support team immediately.
      </p>

      <p>
        Thank you for choosing <strong>Bank Ledger</strong>.
      </p>

      <p>
        Best Regards,<br>
        <strong>Bank Ledger Team</strong>
      </p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(
  userEmail,
  name,
  amount,
  type,
  reason,
) {
  const subject = `${type} Transaction Failed - Bank Ledger`;

  const text = `Hello ${name},

Unfortunately, we were unable to process your transaction.

Transaction Details:
- Transaction Type: ${type}
- Amount: ₹${amount}
- Reason: ${reason}

No funds have been deducted from your account.

If you believe this is an error, please contact our support team.

Best Regards,
Bank Ledger Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px;">
      <h2 style="color:#dc2626;">❌ Transaction Failed</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>
        We were unable to complete your transaction.
      </p>

      <div style="background:#fef2f2; padding:15px; border-radius:8px;">
        <p><strong>Transaction Type:</strong> ${type}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      </div>

      <p>
        No funds have been deducted from your account.
      </p>

      <p>
        If you believe this is an error, please contact our support team.
      </p>

      <p>
        Best Regards,<br>
        <strong>Bank Ledger Team</strong>
      </p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
