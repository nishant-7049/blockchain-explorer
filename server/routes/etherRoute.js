const { Router } = require("express");
const {
  getEtherPrice,
  getAddressData,
  getAlertedAddressDetails,
} = require("../controllers/etherController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = Router();

router.route("/getEthPrice").get(getEtherPrice);
router.route("/address/detail/:address").get(getAddressData);
router
  .route("/address/detail")
  .get(isAuthenticatedUser, getAlertedAddressDetails);

module.exports = router;
