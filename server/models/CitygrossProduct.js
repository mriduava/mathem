const { Schema, model } = require("mongoose");
const modelName = "CitygrossProduct";

let schema = new Schema({
  productName: { type: String, required: true },
  productFullName: { type: String, required: true },
  volume: { type: String, required: false },
  url: { type: String, required: false },
  image: { type: String, required: false },
  retail: { type: String, required: true },
  label: { type: String, required: false },
  origin: { type: String, required: true },
  ecologic: { type: Boolean, required: false },
  priceUnit: { type: String, required: false },
  price: { type: Number, required: true },
  compareUnit: { type: String, required: false },
  comparePrice: { type: Number, required: false },
  discount: {
    type: Object,
    required: false,
    memberDiscount: { type: Boolean, required: false },
    prePrice: { type: Number, required: false },
    discountPrice: { type: Number, required: false },
    maxQuantity: { type: Number, required: false },
  },
});
schema.index({ "$**": "text" });

module.exports = model(modelName, schema);
