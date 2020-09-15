const { Schema, model } = require("mongoose");
const modelName = "Cart";

let schema = new Schema({
  products:{type: Array, require: true}
});

module.exports = model(modelName, schema);
