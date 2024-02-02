const jwt = require("jsonwebtoken");

exports.setToken = async (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "2h",
  });
  res
    .cookie("token", token, {
      path: "/",
      sameSite: "None",
      domain: ".etherexplorer.netlify.com",
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
