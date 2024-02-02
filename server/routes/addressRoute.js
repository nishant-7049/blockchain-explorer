const { Router } = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const {
  setAddressAlert,
  getAllAddressess,
  giveNotifications,
  getAddress,
} = require("../controllers/addressController");

const router = Router();

router
  .route("/setAddressAlert/:address")
  .put(isAuthenticatedUser, setAddressAlert);
router.route("/").get(getAllAddressess);
router.route("/webhook").post(giveNotifications);
router.route("/:address").get(getAddress);

module.exports = router;
