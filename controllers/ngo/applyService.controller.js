const httpStatus = require("http-status");
let httpResponse = require("../../utils/httpResponse.js");
const ApplyServices = require("../../services/ngo/applyService.service.js");
const ApplyService = require("../../models/ngo/ApplyService.model.js");

const createApplyService = async (req, res) => {
  try {
    const isUserExistInService = await ApplyService.findOne({
      $and: [
        { serviceName: req.body?.serviceName },
        { userPhone: req.body?.userPhone },
      ],
    });
    if (isUserExistInService) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(httpResponse("failed", {}, "User already exist in service"));
    } else {
      const result = await ApplyServices.createApplyServices(req.body);

      res
        .status(200)
        .json(httpResponse("success", result, "Service Apply successfully!"));
    }
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
};
const getAllApplyServices = async (req, res) => {
  try {
    const result = await ApplyServices.getAllApplyServices();

    res
      .status(200)
      .json(httpResponse("success", result, "Services data retrived"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
};

const ApplyServicesController = {
  createApplyService,
  getAllApplyServices,
};
module.exports = ApplyServicesController;
