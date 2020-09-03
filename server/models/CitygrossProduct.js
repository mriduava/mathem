const { Schema, model } = require("mongoose");
const modelName = "Citygross";

let schema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: false },
});

module.exports = model(modelName, schema);
