const { Schema, model } = require('mongoose');
const modelName = 'Product';
 
let schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
});
 
module.exports = model(modelName, schema);