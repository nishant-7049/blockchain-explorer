const jwt = require("jsonwebtoken");

exports.setToken = async (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "2h",
  });
  res
    .cookie("token", token, { httpOnly: true, secure: true })
    .status(200)
    .json({
      success: true,
      user,
      message,
    });
};
