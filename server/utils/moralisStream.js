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
    webhookUrl:
      "https://e5eb-2405-201-3043-a888-c592-ed4f-65fe-e2e4.ngrok-free.app/api/address/webhook",
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
