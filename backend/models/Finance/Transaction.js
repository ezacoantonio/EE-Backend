const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  type: {
    type: String, // e.g., 'Income', 'Expense'
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Bank Transfer", "Cash", "Online"],
    default: "Online",
  },
  category: String, // e.g., 'Materials', 'Labor', 'Utilities'
  notes: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
