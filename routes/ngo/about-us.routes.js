let express = require("express");
let multer = require("../../middleware/multer.js");
const newsController = require("../../controllers/ngo/news.controller.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");
const aboutUsController = require("../../controllers/ngo/about-us.controller.js");
let router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  multer.upload.fields([{ name: "aboutImage", maxCount: 1 }]),
  aboutUsController.postAboutUs
);
router.get(
  "/",

  aboutUsController.getAbout
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),

  aboutUsController.deleteAbout
);

let AboutUsRoutes = router;
module.exports = AboutUsRoutes;
