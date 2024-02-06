const Component = require("../../models/backCompInv/Component");

exports.createComponent = async (req, res) => {
  try {
    const newComponent = await Component.create(req.body);
    res.status(201).json(newComponent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComponentByName = async (req, res) => {
  try {
    const component = await Component.findOne({
      componentName: req.params.name,
    });
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const updatedComponent = await Component.findOneAndUpdate(
      { componentName: req.params.name },
      req.body,
      { new: true }
    );
    if (!updatedComponent) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json(updatedComponent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findOneAndDelete({
      componentName: req.params.name,
    });
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchComponents = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const components = await Component.find({
      $or: [
        { componentName: { $regex: searchTerm, $options: "i" } },
        { "files.filePath": { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
