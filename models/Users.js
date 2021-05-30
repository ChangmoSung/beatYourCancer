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
    friends: [
      {
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
        },
        sinceWhen: {
          type: Date,
          required: true,
        },
        lastLightYouSent: {
          type: String,
        },
      },
    ],
    lights: [
      {
        sender: {
          type: String,
          required: true,
        },
        senderEmail: {
          type: String,
          required: true,
        },
        lightsFromThisSender: [
          {
            light: {
              type: String,
              required: true,
            },
            message: {
              type: String,
            },
            removeLightAt: {
              type: Date,
              required: true,
            },
          },
        ],
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  })
);
