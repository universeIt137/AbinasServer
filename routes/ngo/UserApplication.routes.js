let express = require("express");
let auth = require("../../middleware/authMiddleware.js");
let USER_ROLE = require("../../utils/userRole.js");
let userApplicationController = require("../../controllers/ngo/UserApplication.controller.js");
let multer = require("../../middleware/multer.js");

let router = express.Router();

router.patch(
  "/updatepersonalinformation/:phone",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multer.upload.fields([
    { name: "nidCopy", maxCount: 1 },
    { name: "applicantPhoto", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  userApplicationController.updateUserPersonalInformation
);
router.patch(
  "/updateuserapplicationbyadmin/:phone",
  auth(USER_ROLE.ADMIN),
  multer.upload.fields([
    { name: "nidCopy", maxCount: 1 },
    { name: "applicantPhoto", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  userApplicationController.updateUserApllicationByAdmin
);
router.get(
  "/getuserapplication",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userApplicationController.getUserApplications
);
router.patch(
  "/updateuserapplication/:phone",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userApplicationController.updateUserApplication
);
router.patch(
  "/updatestatus/:id",
  auth(USER_ROLE.ADMIN),
  userApplicationController.updateStatus
);
router.delete(
  "/delete/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userApplicationController.deleteUserApplication
);
router.get(
  "/getuserapplication/:phone",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.SUPER_ADMIN),
  userApplicationController.getSingleApplication
);
router.patch(
  "/updateusreapplicationbyadmin/:phone",
  auth(USER_ROLE.ADMIN),
  userApplicationController.updateUserApllicationByAdmin
);
router.delete(
  "/deleteimages/:key/:id",
  auth(USER_ROLE.ADMIN),
  userApplicationController.deleteImages
);

router.get("/test", (req, res) => {
  res.send("userApplication route working");
})

let userApplicationRouter = router;
module.exports = userApplicationRouter;
