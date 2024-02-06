const Project = require("../../models/ProjectManegement/Project");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for projects
exports.searchProjects = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const searchQuery = { $regex: searchTerm, $options: "i" }; // Case-insensitive regex search

    const projects = await Project.find({
      $or: [
        { projectName: searchQuery },
        { clientName: searchQuery },
        { description: searchQuery },
        { "repositories.repoLink": searchQuery },
        { "onlineServices.serviceName": searchQuery },
        { "onlineServices.serviceLink": searchQuery },
        { "tasks.taskName": searchQuery },
        { "communicationLog.notes": searchQuery },
        { deploymentStatus: searchQuery },
        // ... add other fields to search
      ],
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
