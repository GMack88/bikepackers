const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    //exit the process with a failure.
    process.exit(1);
  }
};

module.exports = connectDB;
