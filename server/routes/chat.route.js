const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");


router.post("/:orderId/message", chatController.sendMessage);

router.get("/:orderId/messages", chatController.getMessagesByOrder);

module.exports = router;
