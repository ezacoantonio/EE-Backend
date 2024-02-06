const mongoose = require("mongoose");

const dashboardDataSchema = new mongoose.Schema({
  // Project Overview
  totalProjects: Number,
  ongoingProjects: Number,
  completedProjects: Number,
  upcomingProjects: Number,

  // Task and Workflow Monitoring
  totalTasks: Number,
  pendingTasks: Number,
  completedTasks: Number,

  // Financial Overview
  totalBudget: Number,
  budgetSpent: Number,
  pendingInvoices: Number,

  // Client Communication Summary
  recentMessages: [
    {
      clientId: mongoose.Schema.Types.ObjectId,
      message: String,
      date: Date,
    },
  ],

  // Code Model and Component Inventory Summary
  totalCodeSnippets: Number,
  totalComponents: Number,

  // Chatbot and Support Queries
  recentSupportQueries: [
    {
      queryId: mongoose.Schema.Types.ObjectId,
      queryText: String,
      responseText: String,
      date: Date,
    },
  ],

  // Additional fields can be added as per requirement
});

module.exports = mongoose.model("DashboardData", dashboardDataSchema);
