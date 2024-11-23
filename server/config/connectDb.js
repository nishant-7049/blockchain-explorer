const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.error("MongoDb error :" + err);
    });
};

module.exports = connectDb;
