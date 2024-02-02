const webPush = require("web-push");

const connectWebPush = () => {
  webPush.setVapidDetails(
    "mailto:nishantsharmay2@gmail.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  console.log("Webpush connected.");
};

module.exports = { connectWebPush, webPush };
