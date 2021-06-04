const mongoose = require("mongoose");

module.exports = SideEffects = mongoose.model(
  "sideEffects",
  new mongoose.Schema({
    sideEffectByAdmin: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
