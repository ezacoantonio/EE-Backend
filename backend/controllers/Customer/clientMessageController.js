const ClientMessage = require("../../models/Customer/ClientMessage");

// Fetch messages for a specific project
exports.getMessagesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const messages = await ClientMessage.find({ projectId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Fetch messages from a specific client
exports.getMessagesByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const messages = await ClientMessage.find({ clientId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Manager responding to a message
exports.respondToMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { responseContent } = req.body;
    const message = await ClientMessage.findByIdAndUpdate(
      messageId,
      { response: { content: responseContent, dateResponded: new Date() } },
      { new: true }
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.sendMessageToClient = async (req, res) => {
  try {
    // Extract all required fields from the request body
    const { clientId, projectId, messageType, messageContent } = req.body;

    // Create a new message with all the fields
    const newMessage = new ClientMessage({
      clientId,
      projectId,
      messageType, // Make sure this is correctly included
      messageContent,
      dateSent: new Date(),
    });

    // Save the new message to the database
    await newMessage.save();
    res.status(201).json({ message: "Message sent to client successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
