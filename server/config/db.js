const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
