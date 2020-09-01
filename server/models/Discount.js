const { Schema, model } = require("mongoose");
const modelName = "Discount";

let schema = new Schema({
  productId: { type: Number, required: true },
  memberDiscount: { type: Boolean, required: true },
  prePrice: { type: Number, required: true },
  maxQuantity: { type: Number, required: false },
});

module.exports = model(modelName, schema);
