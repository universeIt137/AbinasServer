let express = require("express");
let multer = require("../../middleware/multer.js");
const newsController = require("../../controllers/ngo/news.controller.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");
let router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  multer.upload.fields([{ name: "newsImage", maxCount: 1 }]),
  newsController.postAnews
);
router.get(
  "/",

  newsController.getAllNewses
);
router.get(
  "/:id",

  newsController.getSingelNews
);
router.delete("/:id", auth(USER_ROLE.ADMIN), newsController.deleteNews);

let newRouter = router;
module.exports = newRouter;
