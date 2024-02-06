const mongoose = require("mongoose");

const clientMessageSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking to the User model
    required: true,
  },
  messageType: {
    type: String,
    enum: ["Update Request", "Gratitude", "Error Report", "Feature Change"],
    required: true,
  },
  messageContent: String,
  dateSent: {
    type: Date,
    default: Date.now,
  },
  response: {
    content: String,
    dateResponded: Date,
  },
});

module.exports = mongoose.model("ClientMessage", clientMessageSchema);
