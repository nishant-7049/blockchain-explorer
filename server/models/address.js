const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Enter value of address."],
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

const addressModel = mongoose.model("addressess", addressSchema);
module.exports = addressModel;
