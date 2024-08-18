let express = require("express");
let router = express.Router();
let authRoutes = require("./ngo/authRoutes.js"); //done
let userApplicationRouter = require("./ngo/UserApplication.routes.js")
let dpsRoutes = require("./ngo/dps.routes.js");

const fdrRoutes = require("./ngo/fdr.routes.js");



let rootRouter = router;

rootRouter.use("/user", authRoutes);
rootRouter.use("/userapplication", userApplicationRouter);
rootRouter.use("/dpsform", dpsRoutes);

// fdr
rootRouter.use("/fdr", fdrRoutes);

module.exports = rootRouter;