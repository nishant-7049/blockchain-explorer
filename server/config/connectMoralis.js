const Moralis = require("moralis").default;

const connectMoralis = async () => {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_ID,
    });
    console.log("Connected to moralis.");
  } catch (err) {
    throw err;
  }
};

module.exports = { Moralis, connectMoralis };
