const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema({
  repoLink: { type: String, required: true },
  password: { type: String }, // Consider using encryption for storing passwords
});

const onlineServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceLink: { type: String, required: true },
  password: { type: String }, // Consider using encryption for storing passwords
});

const taskSchema = new mongoose.Schema({
  taskName: { type: String },
  status: { type: String, enum: ["To Do", "In Progress", "Done"] },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  assignee: { type: String },
});

const milestoneSchema = new mongoose.Schema({
  title: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ["Pending", "Completed"] },
});

const communicationLogSchema = new mongoose.Schema({
  date: { type: Date },
  notes: { type: String },
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  repositories: [repositorySchema],
  onlineServices: [onlineServiceSchema],
  tasks: [taskSchema],
  milestones: [milestoneSchema],
  communicationLog: [communicationLogSchema],
  documentationLinks: [{ type: String }],
  budget: {
    total: { type: Number },
    spent: { type: Number },
  },
  teamMembers: [
    {
      name: { type: String },
      role: { type: String },
    },
  ],
  deploymentStatus: { type: String },
  hostingDetails: { type: String },
  analytics: { type: String }, // Or link to analytics dashboard
});

module.exports = mongoose.model("Project", projectSchema);
