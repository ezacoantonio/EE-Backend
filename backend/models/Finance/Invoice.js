const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: Date,
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    default: "Pending",
  },
  items: [
    {
      description: String,
      quantity: Number,
      price: Number,
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Bank Transfer", "Cash", "Online"],
    default: "Online",
  },
  notes: String,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
