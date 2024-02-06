const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/Dashboard/dashboardController");

// Route to get project and task data for the dashboard
router.get("/dashboard-data", dashboardController.getProjectAndTaskData);
router.get("/finance-data", dashboardController.getFinancialData);

// dashboardRoutes.js
router.get(
  "/project-task-overview",
  dashboardController.getProjectAndTaskOverview
);
router.get("/financial-data", dashboardController.getFinancialData);
router.get(
  "/component-inventory-overview",
  dashboardController.getComponentInventoryOverview
);

router.get(
  "/backend-components-overview",
  dashboardController.getBackendComponentsOverview
);
router.get(
  "/frontend-components-overview",
  dashboardController.getFrontendComponentsOverview
);

module.exports = router;
