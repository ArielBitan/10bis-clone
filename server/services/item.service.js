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
