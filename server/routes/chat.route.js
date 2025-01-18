const express = require("express");
const { joinRoom, sendMessage } = require("../controllers/chat.controller");

const router = express.Router();
//new msg
router.post("/messages", sendMessage);

//msgs of room  
router.get("/messages/:room", joinRoom);

module.exports = router;