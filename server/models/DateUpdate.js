const { Schema, model } = require("mongoose");
const modelName = "DateUpdate";

let schema = new Schema({
dateUpdated: {type: Date, required: true}
});

module.exports = model(modelName, schema);
