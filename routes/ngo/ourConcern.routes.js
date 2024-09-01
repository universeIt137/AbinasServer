const ourConcernController = require("../../controllers/ngo/ourConcern.controller.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");
let express = require("express");

let router = express.Router();

router.post("/", auth(USER_ROLE.ADMIN), ourConcernController.createOurConcern);
router.get(
  "/",
  ourConcernController.getOurConcern
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  ourConcernController.deleteOurConcern
);

let ourConcernRoutes = router;
module.exports = ourConcernRoutes;
