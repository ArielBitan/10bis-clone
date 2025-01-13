const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");
const upload = require("../middleware/upload.middleware");

// Routes
router.post("/", upload.single("image"), itemController.createItem);

//item id
router.put("/:id", upload.single("image"), itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

//search
router.get("/search/:name", itemController.searchItems);

module.exports = router;
