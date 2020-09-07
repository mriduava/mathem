const { Schema, model } = require('mongoose');
const modelName = 'Citygross';
 
let schema = new Schema({
  title: {type: String},
  desc: {type: String},
  price: Number
});
 
module.exports = model(modelName, schema);