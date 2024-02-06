const FrontendComponent = require("../../models/frontCompInv/FrontendComponent");

exports.createFrontendComponent = async (req, res) => {
  try {
    const newComponent = await FrontendComponent.create(req.body);
    res.status(201).json(newComponent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFrontendComponents = async (req, res) => {
  try {
    const components = await FrontendComponent.find();
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFrontendComponentByName = async (req, res) => {
  try {
    const component = await FrontendComponent.findOne({
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

exports.updateFrontendComponent = async (req, res) => {
  try {
    const updatedComponent = await FrontendComponent.findOneAndUpdate(
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

exports.deleteFrontendComponent = async (req, res) => {
  try {
    const component = await FrontendComponent.findOneAndDelete({
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
