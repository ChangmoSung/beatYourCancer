const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

module.exports = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch ({ message = "", reason = "" }) {
    console.error(message || reason);
    process.exit();
  }
};
