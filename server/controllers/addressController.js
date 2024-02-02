const Address = require("../models/address");
const User = require("../models/user");
const Notification = require("../models/notification");
const { Moralis } = require("../config/connectMoralis");
const { catchAsyncError } = require("../utils/catchAsyncError");
const { errorHandler } = require("../utils/errorHandler");
const { getStreamId } = require("../utils/moralisStream");
const { webPush } = require("../config/connectWebPush");
const sendEmail = require("../utils/sendEmail");

exports.setAddressAlert = catchAsyncError(async (req, res, next) => {
  const streamId = await getStreamId();
  const { address } = req.params;
  const userId = req.user._id;
  const balance = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain: "0x1",
  });
  if (!balance && !balance.balance) {
    return next(errorHandler(404, "Give address does not found."));
  }
  const etherAddress = await Address.findOne({ address });
  const user = await User.findById(userId);
  if (etherAddress) {
    if (etherAddress.users.includes(userId)) {
      const filterUsers = etherAddress.users.filter(
        (user) => user.toString() != userId
      );
      const filterAddressess = user.etherAddressess.filter(
        (add) => add != address
      );
      user.etherAddressess = filterAddressess;
      await user.save();
      if (filterUsers.length == 0) {
        await Moralis.Streams.deleteAddress({ address, id: streamId });
        await Address.findByIdAndDelete(etherAddress._id);
      } else {
        etherAddress.users = filterUsers;
        await etherAddress.save();
      }
    } else {
      etherAddress.users = [...etherAddress.users, userId];
      await etherAddress.save();
    }
  } else {
    const options = {
      address,
      users: [userId],
    };
    user.etherAddressess.push(address);
    await user.save();
    await Address.create(options);
    await Moralis.Streams.addAddress({ address, id: streamId });
  }
  res.status(200).json({
    success: true,
    message: "Alert for user is set/removed.",
  });
});

exports.getAddress = catchAsyncError(async (req, res, next) => {
  const add = await Address.findOne({ address: req.params.address });
  res.status(200).json({
    success: true,
    address: add,
  });
});

exports.getAllAddressess = catchAsyncError(async (req, res, next) => {
  const addressess = await Address.find();
  res.status(200).json({
    success: true,
    addressess,
  });
});

exports.giveNotifications = catchAsyncError(async (req, res, next) => {
  console.log("started");
  // const { fromAddress, toAddress, value, gas, hash } = req.body.txs[0];
  // console.log(fromAddress);

  // const address = await Address.findOne({
  //   address: { $regex: fromAddress, $options: "i" },
  // });
  // address.users.forEach(async (userId) => {
  //   const user = await User.findById(userId);
  //   const notificationPayload = {
  //     notification: {
  //       title: `${fromAddress} sent ether to ${toAddress}`,
  //       body: `${fromAddress} sent ${value} wei to ${toAddress}`,
  //       fromAddress,
  //       toAddress,
  //       value,
  //       gas,
  //       hash,
  //     },
  //   };
  //   const notification = await Notification.findOne({ userId: user._id });
  //   notification.notifications.unshift(notificationPayload.notification);
  //   await notification.save();

  //   await sendEmail({
  //     email: user.email,
  //     subject: notificationPayload.notification.title,
  //     message: notificationPayload.notification.body,
  //   });

  // await webPush.sendNotification(
  //   notification.notificationSubscription,
  //   JSON.stringify(notificationPayload)
  // );
  // });
  res.status(200).json({
    success: true,
  });
});
