const mongoose = require("mongoose");

const fileDetailSchema = new mongoose.Schema({
  filePath: String,
  fileCode: String,
});

const componentSchema = new mongoose.Schema({
  componentName: { type: String, required: true, unique: true },
  description: String,
  files: [fileDetailSchema],
});

module.exports = mongoose.model("Component", componentSchema);
