const Notification = require("../models/notification");
const { catchAsyncError } = require("../utils/catchAsyncError");
const { webPush } = require("../config/connectWebPush");

exports.subscribe = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const { subscription } = req.body;
  console.log(subscription);
  const notification = await Notification.findOne({ userId });
  notification.notificationSubscription = subscription;
  await notification.save({ validateBeforeSave: true });
  res.status(201).json({
    success: true,
    message: "Subscription has been saved.",
  });
});

exports.getUserNotifications = catchAsyncError(async (req, res, next) => {
  const notification = await Notification.findOne({ userId: req.user._id });
  res.status(200).json({
    success: true,
    notifications: notification.notifications,
  });
});

exports.testNotification = catchAsyncError(async (req, res, next) => {
  const notificationPayload = {
    notification: {
      title: "Test Notification",
      body: "ajls;dfja;lskfjw;oeifja;owifj;oawj",
    },
  };
  await webPush.sendNotification(
    {
      endpoint:
        "https://fcm.googleapis.com/fcm/send/cIM4Li30_yw:APA91bGImwf-PDAvzzTSwHWFMuFqM3fXFTntH1RSZLepZocDOaWKUMKwMcrHXfQa7MVLIQTlfQA1uOrJF-bseCzqPHLQdFneI-UGBz_l53z2C2v7ZXHyNjWPJOSE5f1x-F44vMOQ53QI",
      expirationTime: null,
      keys: {
        p256dh:
          "BFh4jUlOGM5QaAj4GfiHrgzFjSWxDTabCF3YjdtoTLclhx1blyOwMBidxBx6v449yLB_HMO2bW2A6mHrBJ1Wc_8",
        auth: "vN8NV67KrVwYYiMRPz7DcA",
      },
    },
    JSON.stringify(notificationPayload.notification)
  );
  res.status(200).json({
    success: true,
  });
});
