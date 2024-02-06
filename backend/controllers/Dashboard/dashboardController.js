const DashboardData = require("../../models/Dashboard/DashboardData");
const Project = require("../../models/ProjectManegement/Project");
const Invoice = require("../../models/Finance/Invoice");
const Transaction = require("../../models/Finance/Transaction");
const backendComponents = require("../../models/backCompInv/Component");
const frontendComponents = require("../../models/frontCompInv/FrontendComponent");

exports.getProjectAndTaskData = async (req, res) => {
  try {
    const projects = await Project.find();
    let totalTasks = 0,
      pendingTasks = 0,
      completedTasks = 0;
    let ongoingProjects = 0,
      completedProjects = 0,
      notStartedProjects = 0;

    projects.forEach((project) => {
      // Count tasks
      project.tasks.forEach((task) => {
        totalTasks++;
        if (task.status === "To Do") {
          pendingTasks++;
        } else if (task.status === "Done") {
          completedTasks++;
        }
      });

      // Determine project status based on the 'status' field
      switch (project.status) {
        case "In Progress":
          ongoingProjects++;
          break;
        case "Completed":
          completedProjects++;
          break;
        case "Not Started":
          notStartedProjects++;
          break;
        // Add more cases as needed
      }
    });

    res.json({
      totalProjects: projects.length,
      ongoingProjects,
      completedProjects,
      notStartedProjects,
      totalTasks,
      pendingTasks,
      completedTasks,
      // Add other necessary data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinancialData = async (req, res) => {
  try {
    const projects = await Project.find();
    const invoices = await Invoice.find({ status: "Pending" });
    const transactions = await Transaction.find();

    let totalBudget = 0,
      totalSpent = 0,
      pendingInvoicesAmount = 0;

    projects.forEach((project) => {
      totalBudget += project.budget.total || 0;
      totalSpent += project.budget.spent || 0;
    });

    invoices.forEach((invoice) => {
      pendingInvoicesAmount += invoice.amount || 0;
    });

    const financialData = {
      totalBudget,
      totalSpent,
      pendingInvoices: invoices.length,
      pendingInvoicesAmount,
      totalTransactions: transactions.length,
      // Add other financial summaries as needed
    };

    res.json(financialData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// dashboardController.js
exports.getProjectAndTaskOverview = async (req, res) => {
  try {
    const projects = await Project.find();
    let totalTasks = 0,
      pendingTasks = 0,
      completedTasks = 0;

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        totalTasks++;
        if (task.status === "To Do") pendingTasks++;
        else if (task.status === "Done") completedTasks++;
      });
    });

    const overviewData = {
      totalProjects: projects.length,
      totalTasks,
      pendingTasks,
      completedTasks,
    };

    res.status(200).json(overviewData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinancialData = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    const transactions = await Transaction.find();

    let totalBudget = 0,
      totalSpent = 0,
      pendingInvoices = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") totalBudget += transaction.amount;
      else if (transaction.type === "Expense") totalSpent += transaction.amount;
    });

    pendingInvoices = invoices.filter(
      (invoice) => invoice.status === "Pending"
    ).length;

    const financialData = {
      totalBudget,
      totalSpent,
      pendingInvoices,
    };

    res.status(200).json(financialData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComponentInventoryOverview = async (req, res) => {
  try {
    const backendComponents = await Component.find();
    const frontendComponents = await FrontendComponent.find();

    const inventoryData = {
      totalBackendComponents: backendComponents.length,
      totalFrontendComponents: frontendComponents.length,
    };

    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Backend Components Overview
exports.getBackendComponentsOverview = async (req, res) => {
  try {
    const components = await backendComponents.find();
    res
      .status(200)
      .json({ totalBackendComponents: components.length, components });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Frontend Components Overview
exports.getFrontendComponentsOverview = async (req, res) => {
  try {
    const components = await frontendComponents.find();
    res
      .status(200)
      .json({ totalFrontendComponents: components.length, components });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
