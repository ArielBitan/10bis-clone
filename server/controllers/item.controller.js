const itemService = require("../services/item.service");
const validateAndUploadImage = require("../utils/uploadImage");

exports.createItem = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = await validateAndUploadImage(req.file);
    }
    const item = await itemService.createItem(updateData);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = await validateAndUploadImage(req.file);
    }
    const updatedItem = await itemService.updateItem(req.params.id, updateData);
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await itemService.deleteItem(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
