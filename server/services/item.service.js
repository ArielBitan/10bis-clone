const MenuItem = require("../models/menu-item.model");

exports.createItem = async (itemData) => {
  return await MenuItem.create(itemData);
};

exports.updateItem = async (id, itemData) => {
  return await MenuItem.findByIdAndUpdate(id, itemData, {
    new: true,
  });
};

exports.deleteItem = async (id) => {
  return await MenuItem.findByIdAndDelete(id);
};

exports.searchItemsByName = async (nameInput) => {
  try {
    const regex = new RegExp(nameInput, "i");
    const items = await MenuItem.find({ name: regex }).populate(
      "restaurant_id",
      "name image"
    );

    return items;
  } catch (error) {
    throw new Error(`Error searching items: ${error.message}`);
  }
};
