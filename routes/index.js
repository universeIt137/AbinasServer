let express = require("express");
let router = express.Router();
let authRoutes = require("./ngo/authRoutes.js"); //done
let dpsRoutes = require("./ngo/dps.routes.js");



let rootRouter = router;

rootRouter.use("/user", authRoutes);
rootRouter.use("/dpsform", dpsRoutes);


module.exports = rootRouter;