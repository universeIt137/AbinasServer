const express = require("express");
const fdrcontrollers = require("../../controllers/ngo/fdr.controller");
const auth = require("../../middleware/authMiddleware");
const USER_ROLE = require("../../utils/userRole");

const router = express.Router();
 
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  fdrcontrollers.createAFdr
);
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  fdrcontrollers.getallFdr
);
router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  fdrcontrollers.getSingleFdr
);
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  fdrcontrollers.updateFdr
);
router.patch(
  "/approve/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  fdrcontrollers.approveStatus
);
router.patch(
  "/close/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  fdrcontrollers.closeFdr
);
router.patch(
  "/return/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  fdrcontrollers.returnAmount
);

router.get('/test', (req, res) => {
  res.send("fdr Route is working");
})
 

const fdrRoutes = router;
module.exports = fdrRoutes;
