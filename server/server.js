require("dotenv").config({ path: "./.env" });
const express = require("express");
const connectDb = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const { connectMoralis } = require("./config/connectMoralis");
const { moralisStream } = require("./utils/moralisStream");
const cors = require("cors");
const { connectWebPush } = require("./config/connectWebPush");

connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://etherexplorer.netlify.app",
  "https://*.etherexplorer.netlify.app",
  "https://etherexplorer.netlify.app/login",
  "https://etherexplorer.netlify.app/account",
  "https://etherexplorer.netlify.app/notification",
  "https://etherexplorer.netlify.app/register",
  "https://etherexplorer.netlify.app/profile",
  "https://etherexplorer.netlify.app/notification",
];

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigin = allowedOrigins.find(
      (allowed) => origin && origin.startsWith(allowed)
    );
    if (allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", require("./routes/userRoute"));
app.use("/api/ether", require("./routes/etherRoute"));
app.use("/api/address", require("./routes/addressRoute"));
app.use("/api/notify", require("./routes/notificationRoute"));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

const startServer = async () => {
  try {
    await connectMoralis();
    // await connectWebPush();

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Moralis Error: " + err);
  }
};

const startMoralisStream = async () => {
  await startServer();
  //moralisStream();
};
startMoralisStream();
