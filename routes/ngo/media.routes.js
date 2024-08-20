let express = require("express");
let multer = require("../../middleware/multer.js");
const mediaController = require("../../controllers/ngo/media.controller.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");

let router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  multer.upload.fields([{ name: "mediaImage", maxCount: 1 }]),
  mediaController.postMedia
);
router.get(
  "/",

  mediaController.getAllfromMedia
);

router.delete("/:id", auth(USER_ROLE.ADMIN), mediaController.deleteFromMedia);

let mediaRoutes = router;
module.exports = mediaRoutes;
