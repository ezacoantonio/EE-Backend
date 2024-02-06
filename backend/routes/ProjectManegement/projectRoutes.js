const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/ProjectManegement/projectController");

// Create a new project
router.post("/projects", projectController.createProject);

// Get all projects
router.get("/projects", projectController.getAllProjects);

// Get a single project by ID
router.get("/projects/:id", projectController.getProjectById);

// Update a project
router.put("/projects/:id", projectController.updateProject);

// Delete a project
router.delete("/projects/:id", projectController.deleteProject);

// Search for projects
router.get("/projects/search/:searchTerm", projectController.searchProjects);

module.exports = router;
