const mongoose = require("mongoose");

module.exports = Users = mongoose.model(
  "users",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
    },
    foodsList: {
      type: Array,
    },
    sideEffectsListByUser: {
      type: Array,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
