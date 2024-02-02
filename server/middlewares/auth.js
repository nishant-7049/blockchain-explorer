const User = require("../models/user");
const { catchAsyncError } = require("../utils/catchAsyncError");
const { errorHandler } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(errorHandler(406, "Login first to use this functionality."));
  }
  const { id } = jwt.verify(token, process.env.SECRET);
  if (!id) {
    return next(errorHandler(405, "Login first to use this functionality."));
  }
  const user = await User.findById(id);
  req.user = user;
  next();
});
