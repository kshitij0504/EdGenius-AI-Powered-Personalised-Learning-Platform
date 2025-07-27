const nodemailer = require("nodemailer");
const { ApiError } = require("./ApiError");

const sendVerificationEmail = async (email, token) => {
  const baseUrl = process.env.APP_BASE_URL || "http://localhost:8000";
  const verifyUrl = `${baseUrl}/api/auth/verify-email/${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Edgenius Email</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #007bff; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Edgenius!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; text-align: center;">
            <h2 style="color: #333333; font-size: 20px; margin: 0 0 20px;">Verify Your Email Address</h2>
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
              Thank you for joining Edgenius, your AI-powered personalized learning platform! 
              Please verify your email address to activate your account and start your learning journey.
            </p>
            <a href="${verifyUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold;">
              Verify Email Now
            </a>
            <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 20px 0 0;">
              If the button above doesn't work, copy and paste this link into your browser:
              <br><a href="${verifyUrl}" style="color: #007bff; text-decoration: underline;">${verifyUrl}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
            <p style="color: #777777; font-size: 12px; line-height: 1.5; margin: 0;">
              If you did not create an account with Edgenius, please ignore this email.
              <br>Need help? Contact us at <a href="mailto:support@edgenius.com" style="color: #007bff; text-decoration: underline;">support@edgenius.com</a>.
              <br>© ${new Date().getFullYear()} Edgenius. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Edgenius" <no-reply@edgenius.com>',
      to: email,
      subject: "Verify Your Edgenius Email",
      html: emailTemplate,
      text: `Welcome to Edgenius! Please verify your email by visiting this link: ${verifyUrl}\n\nIf you did not sign up, please ignore this email.`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send verification email to ${email}:`, error);
    return res
      .status(400)
      .json(new ApiError(400, "Failed to send verification email"));
  }
};

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #fff; text-decoration: none; border-radius: 6px;">Reset Password</a>
      <p style="margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
      <p style="color: #888;">This link will expire in 1 hour.</p>
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} Edgenius. All rights reserved.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Edgenius" <no-reply@edgenius.com>',
      to: email,
      subject: "Reset Your Edgenius Password",
      html: htmlContent,
    });
    console.log(`Reset Password email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send reset password email to ${email}:`, error);
    throw new ApiError(400, "Failed to send reset password email ");
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
