let httpStatus = require("http-status");
let createToken =
  require("../../controllers/ngo/auth.controller.js").createToken;
let User = require("../../models/ngo/User.js");
let userUtils = require("../../utils/user.utils.js");
let UserApplication = require("../../models/ngo/UserApplication.model.js");
const { default: mongoose } = require("mongoose");
const jwtHelper = require("../../utils/jwthelper.js");
const ApiError = require("../../error/ApiError.js");
const errorResponse = require("../../utils/errorResnponse.js");
const { verify } = require("jsonwebtoken");

let createUserService = async function (data) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (data && data.role !== "admin" && data.role !== "super_admin") {
      data.id = await userUtils.genrerateUserId();
    }
    const result = await User.create([data], { session });

    if (!data.role && result) {
      const progressPercentage = 0;
      const memberId = result[0].id;

      const personalInformation = {
        name: data.name,
        phone: data.phone,
      };
      await UserApplication.create(
        [
          {
            memberId: memberId,
            progressPercentage: progressPercentage,
            personalInformation: personalInformation,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return result[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllUsersService = async function () {
  const users = await User.find({});
  return users;
};

const refreshToken = async (token) => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelper.verifyToken(
      token,
      "universesoft2022@accesstokensecret@12345"
    );
  } catch (err) {
    throw new Error(
      errorResponse(httpStatus.FORBIDDEN, "failed", "invalid refresh token")
    );
  }
  const { phone } = verifyToken;
  const isUserExist = await User.findOne({
    phone,
  });
  if (!isUserExist) {
    throw new Error(
      errorResponse(
        httpStatus.NOT_FOUND,
        "failed",
        "user not exists with this phone"
      )
    );
  }

  let userJwtData = {
    name: isUserExist.name,
    role: isUserExist.role,
    phone: isUserExist.phone,
    id: isUserExist._id,
  };
  let accessToken = jwtHelper.createToken(
    userJwtData,
    "universesoft2022@accesstokensecret@12345",
    "1d"
  );

  return {
    accessToken,
  };
};

module.exports = {
  createUserService,
  getAllUsersService,
  refreshToken,
};
