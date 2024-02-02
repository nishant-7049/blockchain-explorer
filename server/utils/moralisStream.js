const { Moralis } = require("../config/connectMoralis");
const Address = require("../models/address");

let streamId;
const moralisStream = async () => {
  const options = {
    chains: [0x1],
    description: "Listen to transfers,",
    tag: "transfers",
    includeContractLogs: false,
    includeNativeTxs: true,
    webhookUrl: "https://etherexplorer.onrender.com/api/address/webhook",
  };

  const newStream = await Moralis.Streams.add(options);

  const { id } = newStream.toJSON();
  streamId = id;
  const addressess = await Address.find();

  addressess.forEach(async (address) => {
    await Moralis.Streams.addAddress({
      address: address.address,
      id,
    });
  });
  console.log("Moralis Stream has started.");
};

module.exports = {
  moralisStream,
  getStreamId: () => streamId,
};
