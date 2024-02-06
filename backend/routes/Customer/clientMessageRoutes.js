const express = require("express");
const router = express.Router();
const clientMessageController = require("../../controllers/Customer/clientMessageController");

router.get(
  "/messages/project/:projectId",
  clientMessageController.getMessagesByProject
);
router.get(
  "/messages/client/:clientId",
  clientMessageController.getMessagesByClient
);
router.post(
  "/messages/respond/:messageId",
  clientMessageController.respondToMessage
);
router.post("/send-to-client", clientMessageController.sendMessageToClient);

module.exports = router;
