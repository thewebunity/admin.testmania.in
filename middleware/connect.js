const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected :=====> BACKEND");
  } catch (err) {
    console.log(`Error in connecting to database BACKEND : ${err}`);
  }
};

connectDB();

module.exports.mongoose = mongoose;
