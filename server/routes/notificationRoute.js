const { Router } = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const {
  subscribe,
  testNotification,
  getUserNotifications,
} = require("../controllers/notificationController");

const router = Router();

router.route("/subscribe").put(isAuthenticatedUser, subscribe);
router.route("/test").get(testNotification);
router.route("/").get(isAuthenticatedUser, getUserNotifications);

module.exports = router;
