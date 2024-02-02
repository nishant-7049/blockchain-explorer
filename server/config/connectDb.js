const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://nishantsharmay2:5ioI7YRyboSW1IK8@cluster0.7sioba1.mongodb.net/blockchain"
    )
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.error("MongoDb error :" + err);
    });
};

module.exports = connectDb;
