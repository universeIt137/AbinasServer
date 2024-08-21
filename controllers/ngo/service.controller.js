const httpStatus = require("http-status");
let NgoServices = require("../../services/ngo/services.service.js");
let httpResponse = require("../../utils/httpResponse.js");
async function createServices(req, res) {
  try {
    if (req?.files?.serviceImage) {
      req.body.serviceImage = `http://demoapi.abinashfoundation.com/images/servicesImage/${req?.files?.serviceImage[0]?.filename}`;
    }
    const result = await NgoServices.createServices(req.body);

    res
      .status(200)
      .json(httpResponse("success", result, "service  created successfully"));
  } catch (err) {
    console.log(err);
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getAllServices(req, res) {
  try {
    const result = await NgoServices.getAllServices();
    res
      .status(200)
      .json(httpResponse("success", result, "service  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getSingleService(req, res) {
  try {
    const result = await NgoServices.getSingleService(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "service  retrive successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteService(req, res) {
  try {
    const result = await NgoServices.deleteService(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "service  deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
let NgoServicesController = {
  createServices,
  getAllServices,
  getSingleService,
  deleteService,
};
module.exports = NgoServicesController;
