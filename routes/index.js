let express = require("express");
let router = express.Router();
let authRoutes = require("./ngo/authRoutes.js"); //done
let userApplicationRouter = require("./ngo/UserApplication.routes.js")
let dpsRoutes = require("./ngo/dps.routes.js");
const servicesRoutes = require("./ngo/service.routes.js");
const newsRouter = require("./ngo/news.routes.js");
const mediaRoutes = require("./ngo/media.routes.js");
const ourConcernRoutes = require("./ngo/ourConcern.routes.js");
const AboutUsRoutes = require("./ngo/about-us.routes.js");
const ApplyserviceRoutes = require("./ngo/applyService.route.js");
const fdrRoutes = require("./ngo/fdr.routes.js");

const { jobcircularRoutes, noticeRouter, csrRouter, contactRouter} = require("./ngo/get-in-touch.routes.js");



let rootRouter = router;

rootRouter.use("/user", authRoutes);
rootRouter.use("/userapplication", userApplicationRouter);
rootRouter.use("/dpsform", dpsRoutes);
rootRouter.use("/services", servicesRoutes);
rootRouter.use("/news", newsRouter);
rootRouter.use("/media", mediaRoutes);
rootRouter.use("/our-concern", ourConcernRoutes);
rootRouter.use("/about-us", AboutUsRoutes);

// get in touch 
rootRouter.use("/get-in-touch/job-circular", jobcircularRoutes);
rootRouter.use("/get-in-touch/csr", csrRouter);
rootRouter.use("/get-in-touch/contact", contactRouter);
rootRouter.use('/get-in-touch/notice', noticeRouter);

// apply service 
// rootRouter.use("/apply-service", ApplyserviceRoutes);

// fdr
rootRouter.use("/fdr", fdrRoutes);
module.exports = rootRouter;

