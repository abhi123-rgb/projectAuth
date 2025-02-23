const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
