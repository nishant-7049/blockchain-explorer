const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    minLength: [3, "Username length should be between 3 to 40 characters."],
    maxLength: [40, "Username length should be between 3 to 40 characters."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required."],
    unique: true,
    length: [10, "Phone number length should be 10."],
  },
  password: {
    type: String,
    required: true,
  },
  etherAddressess: [String],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
