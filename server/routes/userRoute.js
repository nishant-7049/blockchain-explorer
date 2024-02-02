const { Router } = require("express");
const {
  signUp,
  signIn,
  test,
  getUserDetail,
  logoutUser,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = Router();

router.route("/register").post(signUp);
router.route("/login").post(signIn);
router.route("/logout").get(logoutUser);
router.route("/").get(isAuthenticatedUser, test);
router.route("/detail/me").get(isAuthenticatedUser, getUserDetail);
router.route("/update/profile").put(isAuthenticatedUser, updateProfile);

module.exports = router;
