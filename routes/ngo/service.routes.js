let express = require("express");
const NgoServicesController = require("../../controllers/ngo/service.controller");
let multer = require("../../middleware/multer.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole");

const router = express.Router();

router.post(
  "/createservice",
  auth(USER_ROLE.ADMIN),

  multer.upload.fields([{ name: "serviceImage", maxCount: 1 }]),
  NgoServicesController.createServices
);
router.get(
  "/:id",

  NgoServicesController.getSingleService
);
router.get(
  "/",

  NgoServicesController.getAllServices
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  NgoServicesController.deleteService
);



let servicesRoutes = router;
module.exports = servicesRoutes;
