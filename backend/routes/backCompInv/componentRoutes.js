const express = require("express");
const router = express.Router();
const componentController = require("../../controllers/backCompInv/componentController");

router.post("/components", componentController.createComponent);
router.get("/components", componentController.getAllComponents);
router.get("/components/:name", componentController.getComponentByName);
router.put("/components/:name", componentController.updateComponent);
router.delete("/components/:name", componentController.deleteComponent);
router.get(
  "/components/search/:searchTerm",
  componentController.searchComponents
);
module.exports = router;
