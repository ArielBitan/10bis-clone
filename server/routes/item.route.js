const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
// Routes
router.post("/", itemController.createItem);

//item id
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
