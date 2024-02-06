// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountChangeSchema = new mongoose.Schema({
  changedField: String,
  oldValue: String,
  newValue: String,
  changedAt: {
    type: Date,
    default: Date.now,
  },
  // Add other fields if needed, like 'changedBy' if you have admin roles
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  accountChanges: [accountChangeSchema],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userType: {
    type: String,
    enum: ["team", "manager", "company", "customer"],
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check password on login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
