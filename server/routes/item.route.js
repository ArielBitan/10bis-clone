const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const upload = require("../middleware/upload.middleware");

// Routes
router.post("/", itemController.createItem);

//item id
router.put("/:id", upload.single("image"), itemController.updateItem);
router.delete("/:id", upload.single("image"), itemController.deleteItem);

module.exports = router;
