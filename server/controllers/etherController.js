const { Moralis } = require("../config/connectMoralis");
const { catchAsyncError } = require("../utils/catchAsyncError");
const User = require("../models/user");

exports.getEtherPrice = catchAsyncError(async (req, res, next) => {
  const etherPrice = await Moralis.EvmApi.token.getTokenPrice({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chain: "0x1",
  });
  res.status(200).json({
    success: true,
    etherPrice,
  });
});

exports.getAlertedAddressDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const addressessDetails = [];

  // Use map to create an array of promises
  const promises = user.etherAddressess.map(async (add) => {
    const options = {
      address: add,
      chain: "0x1",
    };

    const balance = await Moralis.EvmApi.balance.getNativeBalance(options);

    const detail = {
      address: add,
      balance,
    };
    addressessDetails.push(detail);
  });

  // Use Promise.all to wait for all promises to resolve
  await Promise.all(promises);

  res.status(200).json({
    success: true,
    addressessDetails,
  });
});

exports.getAddressData = catchAsyncError(async (req, res, next) => {
  const { address } = req.params;
  const options = {
    address,
    chain: "0x1",
  };
  const price = await Moralis.EvmApi.balance.getNativeBalance(options);
  const tokenBalance = await Moralis.EvmApi.token.getWalletTokenBalances(
    options
  );

  const transactions =
    await Moralis.EvmApi.transaction.getWalletTransactionsVerbose(options);
  res.status(200).json({
    success: true,
    balance: price,
    tokenBalance,
    transactions,
  });
});
