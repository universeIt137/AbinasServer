let express = require("express");
let multer = require("../../middleware/multer.js");
const auth = require("../../middleware/authMiddleware.js");
const USER_ROLE = require("../../utils/userRole.js");
const {
  jobcircularController,
  noticeController,
  csrController,
  contactController,
} = require("../../controllers/ngo/get-in-touch.controller.js");
let router = express.Router();
let noticeRouter = express.Router();
let csrRouter = express.Router();
let contactRouter = express.Router();

//  job circular
router.post(
  "/",
  auth(USER_ROLE.ADMIN),

  jobcircularController.postAjobCircular
);
router.get(
  "/",

  jobcircularController.getJobCirculars
);
router.get(
  "/:id",

  jobcircularController.getSingleJobCircular
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  jobcircularController.deleteJobCircular
);

// notice
noticeRouter.post(
  "/",

  auth(USER_ROLE.ADMIN),
  multer.upload.fields([{ name: "noticeImage", maxCount: 1 }]),

  noticeController.postAnotice
);
noticeRouter.get(
  "/",

  noticeController.getNotices
);
noticeRouter.get(
  "/:id",

  noticeController.getSingleNotice
);
noticeRouter.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  noticeController.deleteAnotice
);

// csr
csrRouter.post(
  "/",
  auth(USER_ROLE.ADMIN),
  multer.upload.fields([{ name: "csrImage", maxCount: 1 }]),
  csrController.postAcsr
);
csrRouter.get(
  "/",

  csrController.getAllCsr
);
csrRouter.get(
  "/:id",

  csrController.getSingleCsr
);
csrRouter.delete("/:id", auth(USER_ROLE.ADMIN), csrController.deleteCsr);

// contact
contactRouter.post(
  "/",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),

  contactController.postContact
);
contactRouter.get(
  "/",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  contactController.getAllContact
);
contactRouter.get(
  "/:id",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  contactController.getSingleContact
);
contactRouter.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  contactController.deleteContact
);

let jobcircularRoutes = router;
module.exports = {
  jobcircularRoutes,
  contactRouter,
  csrRouter,
  noticeRouter,
};
