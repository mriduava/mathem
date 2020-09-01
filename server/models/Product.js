const { Schema, model } = require('mongoose');
const modelName = 'Product';
 
let schema = new Schema({
  categoryId: { type: Number, required: true },
  productName: { type: String, required: true },
  productFullName: { type: String, required: true },
  volume: { type: Number, required: false },
  url: { type: String, required: false },
  retail: { type: String, required: true },
  label: { type: String, required: false },
  origin: { type: String, required: true },
  retail: { type: Boolean, required: true },
  priceUnit: { type: String, required: true },
  price: { type: Number, required: true },
  compareUnit: { type: String, required: true },
  comparePrice: { type: Number, required: true },
  // productId: { type: Number, required: true },
  // memberDiscount: { type: Boolean, required: true },
  // prePrice: { type: Number, required: true },
  // maxQuantity: { type: Number, required: false },
});
 
module.exports = model(modelName, schema);