const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectToDb;
