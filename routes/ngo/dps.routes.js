const express = require("express");
const dpsController = require("../../controllers/ngo/dps.controller.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");
const DpspaymentHistory = require("../../models/ngo/dps.paymentHistory.model.js");
const router = express.Router();
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  dpsController.createAdps
);
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  dpsController.getAllDps
);
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  dpsController.updateDps
);

router.patch(
  "/approve/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  dpsController.approveDps
);
router.patch(
  "/payInstallment/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  dpsController.payInstallment
);
router.patch(
  "/returnAmount/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  dpsController.returnAmount
);
router.patch(
  "/closeDps/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  dpsController.closeDps
);

router.get("/test", (req, res) => {
  res.send("dps route is working")
})

// router.patch(
//   "/latefee/:id",
//   // auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
//   dpsController.calculateLateFee
// );
const dpsRoutes = router;

module.exports = dpsRoutes;
