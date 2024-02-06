// routes/authRoutes.js

const express = require("express");
const authController = require("../controllers/auth/authController");
const router = express.Router();
//
const { protect } = require("../middlewares/authMiddleware"); // Adjust path as necessary

router.post("/register", authController.register);
router.post("/login", authController.login);
// Add routes for editAccount and resetPassword
router.put("/edit-account", protect, authController.editAccount);
// Add routes for password reset
router.post("/request-password-reset", authController.requestPasswordReset); // Request password reset link
router.post("/reset-password", authController.resetPassword); // Reset password
// Add route for changing password
router.put("/change-password", protect, authController.changePassword);

module.exports = router;
