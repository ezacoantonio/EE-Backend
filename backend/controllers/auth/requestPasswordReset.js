const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const User = require("../../models/User"); // Adjust path as necessary

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // SendGrid email setup
    const msg = {
      to: user.email,
      from: process.env.SENDGRID_VERIFIED_SENDER, // Use the email you verified with SendGrid
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Please click on the following link, or paste it into your browser to complete the process:</p><a href="http://yourapp.com/reset-password/${resetToken}">Reset Password</a>`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
