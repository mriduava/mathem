const { Schema, model } = require('mongoose');
const modelName = 'Product';
 
let schema = new Schema({
  productName: { type: String, required: true },
  productFullName: { type: String, required: true },
  volume: { type: String, required: false },
  url: { type: String, required: false },
  retail: { type: String, required: true },
  label: { type: String, required: false },
  origin: { type: String, required: true },
  retail: { type: String, required: true },
  priceUnit: { type: String, required: true },
  price: { type: Number, required: true },
  compareUnit: { type: String, required: true },
  comparePrice: { type: Number, required: true },
  discount: {
    type: Object,
    required: false,
    memberDiscount: { type: Boolean, required: false},
    prePrice: { type: Number, required: false },
    discountPrice: { type: Number, required: false },
    maxQuantity: { type: Number, required: false },
  },
});
 
module.exports = model(modelName, schema);