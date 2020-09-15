const { Schema, model } = require("mongoose");
const modelName = "WillysProduct";

let schema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: false },
  volume: { type: String, required: false },
  url: { type: String, required: false },
  image: { type: String, required: false },
  retail: { type: String, required: true },
  label: { type: String, required: false },
  origin: { type: String, required: true },
  ecologic: { type: Boolean, required: false },
  priceUnit: { type: String, required: true },
  price: { type: Number, required: true },
  compareUnit: { type: String, required: false },
  comparePrice: { required: false },
  discount: {
    type: Object,
    required: false,
    memberDiscount: { type: Boolean, required: false },
    prePrice: { type: Number, required: false },
    discountPrice: { type: Number, required: false },
    maxQuantity: { type: Number, required: false },
    applied: {type: Boolean, required: true}
  },
});
schema.index({ "$**": "text" });

module.exports = model(modelName, schema);
