// controllers/auth/authController.js

const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Function to read HTML file and replace placeholders
const readHtmlTemplate = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, { encoding: "utf-8" });
  for (let key in replacements) {
    template = template.replace(
      new RegExp(`{{${key}}}`, "g"),
      replacements[key]
    );
  }
  return template;
};

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});
// Function to read the HTML file and replace the placeholder
const readHtmlFile = (filePath, replacements) => {
  let html = fs.readFileSync(filePath, { encoding: "utf-8" });
  Object.keys(replacements).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), replacements[key]);
  });
  return html;
};

exports.register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, username, email, password, userType } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      userType,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user: " + error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send("Incorrect email or password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({ token });
};

exports.editAccount = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Function to log changes
    const logChange = (field, newValue) => {
      const oldValue = user[field];
      if (newValue && oldValue !== newValue) {
        user.accountChanges.push({
          changedField: field,
          oldValue: oldValue,
          newValue: newValue,
          changedAt: Date.now(),
        });
        user[field] = newValue;
      }
    };

    // Log and apply changes for each field, except userType
    Object.keys(req.body).forEach((field) => {
      if (field !== "userType") {
        logChange(field, req.body[field]);
      }
    });

    // Save the user with updated info and change history
    await user.save();
    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    // Email setup
    const templatePath = path.join(
      __dirname,
      "../templates/passwordResetTemplate.html"
    );
    const emailHtml = readHtmlFile(templatePath, { token: resetToken });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset Request",
      html: emailHtml,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Send Mail error: ", error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        res
          .status(200)
          .json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the password and clear the reset token fields
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.userId; // ID from protect middleware
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password is correct
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Update with new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
