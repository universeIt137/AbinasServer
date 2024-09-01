let httpStatus = require("http-status");
let UserApplication = require("../../models/ngo/UserApplication.model.js");

let updateUserPersonalInformation = async function (phone, data) {
  data.progressPercentage = 20;
  let result = await UserApplication.findOneAndUpdate(
    {
      "personalInformation.phone": phone,
    },
    data,
    { new: true }
  );

  return result;
};

let updateUserApplication = async function (phone, data) {
  let userApplication = await UserApplication.findOne({
    "personalInformation.phone": phone,
  });
  // console.log("find", userApplication);
  if (
    !data.progressPercentage &&
    userApplication &&
    userApplication.progressPercentage < 100
  ) {
    let currentProgress = userApplication.progressPercentage || 0;
    let newProgress = currentProgress + 20;
    data.progressPercentage = newProgress;
  }
  let result = await UserApplication.findOneAndUpdate(
    {
      "personalInformation.phone": phone,
    },
    data,
    { new: true }
  );
  // console.log(result);
  return result;
};

// get all user
const getUserApplications = async (options) => {
  const { page, limit } = options;
  const skip = (page - 1) * limit;

  const result = await UserApplication.find({})
    .limit(limit)
    .skip(skip)

    .sort({
      _id: -1,
    });

  return {
    page,
    limit,
    total: result?.length,
    result,
  };
};

// update status aprooved
let updateStatus = async function (id, data) {
  let status = data.status;
  let result = await UserApplication.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      status: status,
    },
    {
      returnOriginal: false,
    }
  );
  return result;
};

let deleteUserApplication = async function (id) {
  let result = await UserApplication.findByIdAndDelete({
    _id: id,
  });
  return result;
};

// get single users application
let getSingleApplication = async function (phone) {
  let result = await UserApplication.findOne({
    "personalInformation.phone": phone,
  });
  // console.log(result);
  return result;
};

// delete image
let deleteImages = async function (payload) {
  let key = payload.key;
  let id = payload.id;

  let updateData = {};

  if (key === "nidCopy") {
    updateData["personalInformation.nidCopy"] = "";
  }

  if (key === "applicantPhoto") {
    updateData["personalInformation.applicantPhoto"] = "";
  }

  if (key === "signature") {
    updateData["personalInformation.signature"] = "";
  }

  let result = await UserApplication.findByIdAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true }
  );

  return result;
};

let updateUserApplicationByAdmin = async function (phone, data) {
  data.progressPercentage = 100;
  let findUserApplication = await UserApplication.findOne({
    "personalInformation.phone": phone,
  });
  if (!findUserApplication) {
    throw new Error("user application not found");
  }
  let result = await UserApplication.findOneAndUpdate(
    {
      "personalInformation.phone": phone,
    },
    data,
    { new: true }
  );

  return result;
};

const UserApplicationServices = {
  updateUserPersonalInformation,
  getUserApplications,
  deleteImages,
  updateUserApplication,
  updateStatus,
  deleteUserApplication,
  getSingleApplication,
  updateUserApplicationByAdmin,
};

module.exports = UserApplicationServices;
