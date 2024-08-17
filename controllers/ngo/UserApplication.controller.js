let httpStatus = require("http-status");
let UserApplicationServices = require("../../services/ngo/UserApplication.service.js");
let httpResponse = require("../../utils/httpResponse.js");
let uploadImage = require("../../utils/cloudinary.js");

let updateUserPersonalInformation = async function (req, res) {
  try {
    let formData = {};

    formData["personalInformation"] = { ...req.body };
    if (req.files?.applicantPhoto) {
      formData.personalInformation.applicantPhoto = `http://demoapi.abinashfoundation.com/images/applicantPhoto/${req?.files?.applicantPhoto[0]?.filename}`;
    }
    if (req.files?.nidCopy) {
      formData.personalInformation.nidCopy = `http://demoapi.abinashfoundation.com/images/nidCopy/${req?.files?.nidCopy[0]?.filename}`;
    }
    if (req.files?.signature) {
      formData.personalInformation.signature = `http://demoapi.abinashfoundation.com/images/signature/${req?.files?.signature[0]?.filename}`;
    }
    let result = await UserApplicationServices.updateUserPersonalInformation(
      req.params.phone,
      formData
    );
    console.log(formData);
    res
      .status(200)
      .json(
        httpResponse("success", result, "User application updated successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
};

// update othres information
let updateUserApplication = async function (req, res) {
  try {
    let result = await UserApplicationServices.updateUserApplication(
      req.params.phone,
      req.body
    );
    res
      .status(200)
      .json(
        httpResponse("success", result, "User application updated successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
};

const getUserApplications = async (req, res) => {
  const options = {
    page: parseInt(req.query.page),
    limit: parseInt(req.query.limit),
  };
  try {
    const result = await UserApplicationServices.getUserApplications(options);
    res
      .status(200)
      .json(httpResponse("success", result, "Data retrieved successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, "Internal server error"));
  }
};

let updateStatus = async function (req, res) {
  try {
    let result = await UserApplicationServices.updateStatus(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json(httpResponse("success", result, "status update successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

let deleteUserApplication = async function (req, res) {
  try {
    let result = await UserApplicationServices.deleteUserApplication(
      req.params.id
    );
    res
      .status(200)
      .json(
        httpResponse("success", result, "user application deleted successfully")
      );
  } catch (err) {
    res.staus(500).json(httpResponse("failed", {}, "something went wrong"));
  }
};

let getSingleApplication = async function (req, res) {
  try {
    let result = await UserApplicationServices.getSingleApplication(
      req.params.phone
    );
    res
      .status(200)
      .json(
        httpResponse("success", result, "user application retrive successfully")
      );
  } catch (err) {
    res.staus(500).json(httpResponse("failed", {}, err.message));
  }
};
// delete images
let deleteImages = async function (req, res) {
  try {
    let result = await UserApplicationServices.deleteImages(req.params);
    res
      .status(200)
      .json(
        httpResponse(
          "success",
          result,
          "user application images deleted successfully"
        )
      );
  } catch (err) {
    res.status(500).json(httpResponse("success", {}, err.message));
  }
};

//
let updateUserApllicationByAdmin = async function (req, res) {
  try {
    let formData = { ...req.body };

    if (req.files?.applicantPhoto) {
      let applicantPhoto = await uploadImage(req.files?.applicantPhoto[0].path);
      let applicantPhotoURL = applicantPhoto.secure_url;
      formData.personalInformation.applicantPhoto = applicantPhotoURL;
    }
    if (req.files?.nidCopy) {
      let nidCopy = await uploadImage(req.files?.nidCopy[0].path);
      let nidCopyURL = nidCopy.secure_url;
      formData.personalInformation.nidCopy = nidCopyURL;
    }
    if (req.files?.signature) {
      let signature = await uploadImage(req.files?.signature[0].path);
      let signatureURL = signature.secure_url;
      formData.personalInformation.signature = signatureURL;
    }

    let result = await UserApplicationServices.updateUserApplicationByAdmin(
      req.params.phone,
      formData
    );
    res
      .status(200)
      .json(
        httpResponse("success", result, "user application updated successfully")
      );
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

let userApplicationController = {
  updateUserPersonalInformation: updateUserPersonalInformation,
  getUserApplications: getUserApplications,
  updateUserApplication: updateUserApplication,
  updateStatus: updateStatus,
  deleteUserApplication: deleteUserApplication,
  getSingleApplication: getSingleApplication,
  updateUserApllicationByAdmin: updateUserApllicationByAdmin,
  deleteImages: deleteImages,
};
module.exports = userApplicationController;
