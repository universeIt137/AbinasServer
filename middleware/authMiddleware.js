let httpStatus = require("http-status");
let jwtHelper = require("../utils/jwthelper.js");
let jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError.js");
const errorResponse = require("../utils/errorResnponse.js");

const auth =
  (...requiredRoles) =>
    async (req, res, next) => {
      try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
          return res
            .status(httpStatus.UNAUTHORIZED)
            .json(
              errorResponse(
                httpStatus.UNAUTHORIZED,
                "failed",
                "you are not authorized"
              )
            );
        }

        // verify token
        let verifiedUser = null;

        verifiedUser = jwt.verify(
          token,
          "universesoft2022@accesstokensecret@12345"
        );

        req.user = verifiedUser; // role  , userid

        // role diye guard korar jnno
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          return res
            .status(httpStatus.UNAUTHORIZED)
            .json(errorResponse(httpStatus.UNAUTHORIZED, "failed", "forbidden"));
        }
        next();
      } catch (error) {
        console.log(error);
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json(
            errorResponse(
              httpStatus.UNAUTHORIZED,
              "failed",
              `${error.message}! please login again`
            )
          );
        // next(error);
      }
    };
module.exports = auth;
