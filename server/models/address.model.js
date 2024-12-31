const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address_line: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    coordinates: { type: Object, required: true },
  },
  {
    versionKey: false,
  }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
