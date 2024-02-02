const jwt = require("jsonwebtoken");

exports.setToken = async (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "2h",
  });
  res
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      user,
      message,
    });
};
