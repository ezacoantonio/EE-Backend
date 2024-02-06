const mongoose = require("mongoose");

const frontendComponentSchema = new mongoose.Schema({
  componentName: { type: String, required: true, unique: true },
  description: String,
  codeSnippet: String,
  dependencies: [{ type: String }],
  styles: String,
  props: [{ propName: String, propType: String, defaultValue: String }],
});

module.exports = mongoose.model("FrontendComponent", frontendComponentSchema);
