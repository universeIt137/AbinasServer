let express = require("express");
let router = express.Router();
let authRoutes = require("./ngo/authRoutes.js"); //done



let rootRouter = router;

rootRouter.use("/user", authRoutes);


module.exports = rootRouter;