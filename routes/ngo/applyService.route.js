const express = require("express");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole");
const ApplyServicesController = require("../../controllers/ngo/applyService.controller.js");

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.USER),
  ApplyServicesController.createApplyService
);
router.get(
  "/",
  auth(USER_ROLE.ADMIN),
  ApplyServicesController.getAllApplyServices
);

const applyServicesRoutes = router;
module.exports = applyServicesRoutes;
