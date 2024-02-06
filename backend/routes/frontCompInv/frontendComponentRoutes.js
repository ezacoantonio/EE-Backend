const express = require("express");
const router = express.Router();
const frontendComponentController = require("../../controllers/frontCompInv/frontendComponentController");

router.post(
  "/frontend-components",
  frontendComponentController.createFrontendComponent
);
router.get(
  "/frontend-components",
  frontendComponentController.getAllFrontendComponents
);
router.get(
  "/frontend-components/:name",
  frontendComponentController.getFrontendComponentByName
);
router.put(
  "/frontend-components/:name",
  frontendComponentController.updateFrontendComponent
);
router.delete(
  "/frontend-components/:name",
  frontendComponentController.deleteFrontendComponent
);

module.exports = router;
