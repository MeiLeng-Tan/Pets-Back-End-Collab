const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const petSchema = Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  breed: String,
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
