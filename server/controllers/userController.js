const User = require("../models/user");
const { catchAsyncError } = require("../utils/catchAsyncError");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/errorHandler");
const { setToken } = require("../utils/setToken");
const Notification = require("../models/notification");

exports.signUp = catchAsyncError(async (req, res, next) => {
  const { username, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  await Notification.create({ userId: user._id });
  const message = "User registered and logged in successfully.";
  setToken(res, user, message);
});

exports.signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(errorHandler(401, "Inavalid username or password."));
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return next(errorHandler(401, "Invalid username or password."));
  }
  const message = "Logged in successfully.";
  setToken(res, user, message);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You Logged Our successfully",
  });
});

exports.test = catchAsyncError((req, res) => {
  console.log(req.user);
  res.status(200).json({
    message: "test successful.",
  });
});

exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { username, phone, email } = req.body;
  await User.findByIdAndUpdate(req.user._id, {
    username,
    phone,
    email,
  });
  res.status(200).json({
    success: true,
    message: "Profile changed successfully",
  });
});
