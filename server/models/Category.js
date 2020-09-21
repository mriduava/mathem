const { Schema, model } = require("mongoose");
const modelName = "Category";

let schema = new Schema({
  name: {type: String, required: false},
  categoryId: {type: String, required: false},
  retailName: {type: String, required: true}
});

module.exports = model(modelName, schema);
