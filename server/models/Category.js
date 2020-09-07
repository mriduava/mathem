const { Schema, model } = require("mongoose");
const modelName = "Category";

let schema = new Schema({
  name: {type: String, required: true}
});

module.exports = model(modelName, schema);
