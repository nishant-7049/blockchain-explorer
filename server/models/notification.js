const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  notificationSubscription: {
    endpoint: String,
    expirationTime: String,
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  notifications: [
    {
      title: String,
      body: String,
      fromAddress: String,
      toAddress: String,
      value: String,
      gas: String,
      hash: String,
    },
  ],
});
const notificationModel = mongoose.model("notifications", notificationSchema);

module.exports = notificationModel;
